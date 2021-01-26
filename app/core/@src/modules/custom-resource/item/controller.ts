import { Controller, Delete, Get, Post } from '@nestjs/common';
import { wValidatedArg } from '@src/common/joi/decorators';
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

@Controller('/api/custom-resource/item')
export default class CommonResourceItemController {
  constructor(private readonly _Model: CustomResourceItemModel) {}

  @Post('/')
  public async create(
    @wValidatedArg(APOSTCustomResourceItemSchema)
    args: IAPOSTCustomResourceItem,
  ): Promise<IRPOSTCustomResourceItem> {
    const responseItem = new CustomResourceItem(args);
    await this._Model.addMany([responseItem]);
    return responseItem;
  }

  @Get('/')
  public async get(
    @wValidatedArg(AGETCustomResourceItemSchema)
    args: IAGETCustomResourceItem,
  ): Promise<IRGETCustomResourceItem> {
    return this._Model.getById(args._id);
  }

  @Get('/list/page')
  public async getListPage(
    @wValidatedArg(AGETCustomREsourceItemListPageSchema)
    args: IAGETCustomResourceItemListPage,
  ): Promise<IRGETCustomResourceItemListPage> {
    const { class: itemClass, pagination } = args;
    const filter = (items: ICustomResourceItem[]) =>
      items.filter((e) => e.class.equals(itemClass));
    return this._Model.getPage(pagination, filter);
  }

  @Delete('/')
  public async delete(
    @wValidatedArg(ADELETECustomResourceItemSchema)
    args: IADELETECustomResourceItem,
  ): Promise<IRDELETECustomResourceItem> {
    return this._Model.deleteById(args._id);
  }
}
