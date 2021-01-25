import { Controller, Delete, Get, Post } from '@nestjs/common';
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
  @Post()
  public async create(
    args: IAPOSTCustomResourceItem,
  ): Promise<IRPOSTCustomResourceItem> {}

  @Get()
  public async get(
    args: IAGETCustomResourceItem,
  ): Promise<IRGETCustomResourceItem> {}

  @Get()
  public async getListPage(
    args: IAGETCustomResourceItemListPage,
  ): Promise<IRGETCustomResourceItemListPage> {}

  @Delete()
  public async delete(
    args: IADELETECustomResourceItem,
  ): Promise<IRDELETECustomResourceItem> {}
}
