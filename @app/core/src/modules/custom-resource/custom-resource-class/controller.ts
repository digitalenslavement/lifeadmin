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
    return this._Model.getById(args._id);
  }

  @Get()
  public async getListPage(
    args: IAGETCustomResourceClassListPage,
  ): Promise<IRGETCustomResourceClassListPage> {
    return this._Model.getPage(args);
  }

  @Delete()
  public async delete(
    args: IADELETECustomResourceClass,
  ): Promise<IRDELETECustomResourceClass> {
    return this._Model.deleteById(args._id);
  }
}
