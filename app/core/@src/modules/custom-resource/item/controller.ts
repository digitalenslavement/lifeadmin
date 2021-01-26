import { Controller, Delete, Get, Post } from '@nestjs/common';
import { wValidatedArg } from '@src/common/joi/decorators';
import { CustomResourceClassModel } from '../class/model/model';
import CustomResourceItemModel, { CustomResourceItem } from './model/model';
import { ICustomResourceItem } from './schemas/helper-schemas';
import {
  ADELETECustomResourceItemSchema,
  AGETCustomREsourceItemListPageSchema,
  AGETCustomResourceItemSchema,
  APOSTCustomResourceItemSchema,
  IADELETECustomResourceItem,
  IAGETCustomResourceItem,
  IAGETCustomResourceItemListPage,
  IAPOSTCustomResourceItem,
  IRDELETECustomResourceItem,
  IRGETCustomResourceItem,
  IRGETCustomResourceItemListPage,
  IRPOSTCustomResourceItem,
} from './schemas/validators';
import CustomResourceItemService from './services';

@Controller('/api/custom-resource/item')
export default class CustomResourceItemController {
  constructor(
    private readonly _Model: CustomResourceItemModel,
    private readonly _ClassModel: CustomResourceClassModel,
    private readonly _Service: CustomResourceItemService,
  ) {}

  @Post('/')
  public async create(
    @wValidatedArg(APOSTCustomResourceItemSchema)
    args: IAPOSTCustomResourceItem,
  ): Promise<IRPOSTCustomResourceItem> {
    const itemClass = await this._ClassModel.getById(args.class);
    const wPreparedRows = this._Service.wPreparedRows({
      rawItems: args,
      itemClassId: itemClass._id,
      itemClass,
    });

    this._Service.assertSatisfiesClass({
      class: itemClass,
      items: [wPreparedRows],
    });

    await this._Model.addMany([wPreparedRows]);
    return wPreparedRows;
  }

  @Get('/')
  public async get(
    @wValidatedArg(AGETCustomResourceItemSchema)
    args: IAGETCustomResourceItem,
  ): Promise<IRGETCustomResourceItem> {
    const item = await this._Model.getById(args._id);
    return this._Service.wPreparedRows({
      rawItems: item,
      itemClassId: item.class,
    });
  }

  @Get('/list/page')
  public async getListPage(
    @wValidatedArg(AGETCustomREsourceItemListPageSchema)
    args: IAGETCustomResourceItemListPage,
  ): Promise<IRGETCustomResourceItemListPage> {
    const { class: itemClassId, pagination } = args;
    const filter = (items: ICustomResourceItem[]) =>
      items.filter((e) => e.class.equals(itemClassId));

    const [rawItems, itemClass] = await Promise.all([
      this._Model.getPage(pagination, filter),
      this._ClassModel.getById(itemClassId),
    ]);

    return this._Service.wPreparedRows({
      rawItems,
      itemClassId: itemClass._id,
      itemClass,
    });
  }

  @Delete('/')
  public async delete(
    @wValidatedArg(ADELETECustomResourceItemSchema)
    args: IADELETECustomResourceItem,
  ): Promise<IRDELETECustomResourceItem> {
    const rawItem = await this._Model.deleteById(args._id);
    return this._Service.wPreparedRows({
      rawItems: rawItem,
      itemClassId: rawItem.class,
    });
  }
}
