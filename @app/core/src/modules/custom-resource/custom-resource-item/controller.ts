import { Controller, Delete, Get, Post } from '@nestjs/common';
import CustomResourceItemModel, { CustomResourceItem } from './model/model';
import {
  IADELETECustomResourceItem,
  IAGETCustomResourceItem,
  IAGETCustomResourceItemListPage,
  IAPOSTCustomResourceItem,
  IRDELETECustomResourceItem,
  IRGETCustomResourceItem,
  IRGETCustomResourceItemListPage,
  IRPOSTCustomResourceItem,
} from './schemas/validators';

@Controller()
export default class CommonResourceItemController {
  constructor(
    private readonly _Model: CustomResourceItemModel
  ){}

  @Post()
  public async create(
    args: IAPOSTCustomResourceItem,
  ): Promise<IRPOSTCustomResourceItem> {
    const responseItem = new CustomResourceItem(args);
    await this._Model.addMany([responseItem]);
    return responseItem;
  }

  @Get()
  public async get(
    args: IAGETCustomResourceItem,
  ): Promise<IRGETCustomResourceItem> {
    return this._Model.getById(args._id);  }

  @Get()
  public async getListPage(
    args: IAGETCustomResourceItemListPage,
  ): Promise<IRGETCustomResourceItemListPage> {
    return this._Model.getPage(args);
  }

  @Delete()
  public async delete(
    args: IADELETECustomResourceItem,
  ): Promise<IRDELETECustomResourceItem> {
    return this._Model.deleteById(args._id);
  }
}
