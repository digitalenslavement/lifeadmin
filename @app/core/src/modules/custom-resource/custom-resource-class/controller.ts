import { Controller, Delete, Get, Post } from '@nestjs/common';
import JSONModel from 'src/common/json-model';
import PaginationService from 'src/common/utils/pagination';
import {CustomResourceClass, CustomResourceClassModel} from './model/model';
import {
  IAPOSTCustomResourceClass,
  IRPOSTCustomResourceClass,
  IAGETCustomResourceClass,
  IRGETCustomResourceClass,
  IADELETECustomResourceClass,
  IAGETCustomResourceClassListPage,
  IRGETCustomResourceClassListPage,
  IRDELETECustomResourceClass,
} from './schemas/validators';

@Controller()
export default class CustomResourceClassController {
  constructor(
    private readonly _Model: CustomResourceClassModel
  ){}

  @Post()
  public async create(
    args: IAPOSTCustomResourceClass,
  ): Promise<IRPOSTCustomResourceClass> {
    const responseItem = new CustomResourceClass(args);
    await this._Model.addMany([responseItem]);
    return responseItem;
  }

  @Get()
  public async get(
    args: IAGETCustomResourceClass,
  ): Promise<IRGETCustomResourceClass> {
    const item = (await this._Model.getAll()).find(e => e._id === args._id);
    if(!item) throw new Error("Item Not Found");
    return item;
  }

  @Get()
  public async getListPage(
    args: IAGETCustomResourceClassListPage,
  ): Promise<IRGETCustomResourceClassListPage> {
    const allItems = await this._Model.getAll();
    const responseItems = PaginationService.paginate({items: allItems, paginationQuery: args});
    return responseItems;
  }

  @Delete()
  public async delete(
    args: IADELETECustomResourceClass,
  ): Promise<IRDELETECustomResourceClass> {
    const item = await this.get(args);
    await this._Model.deleteMany([item._id]);
    return item;
  }
}
