import { Controller, Delete, Get, Post } from '@nestjs/common';
import { wValidatedArg } from '@src/common/joi/decorators';
import { CustomResourceClass, CustomResourceClassModel } from './model/model';
import {
  IAPOSTCustomResourceClass,
  IRPOSTCustomResourceClass,
  IAGETCustomResourceClass,
  IRGETCustomResourceClass,
  IADELETECustomResourceClass,
  IAGETCustomResourceClassListPage,
  IRGETCustomResourceClassListPage,
  IRDELETECustomResourceClass,
  APOSTCustomResourceClassSchema,
  AGETCustomResourceClassSchema,
  AGETCustomResourceClassListPageSchema,
  ADELETECustomResourceClassSchema,
} from './schemas/validators';

@Controller('/api/custom-resource/class')
export default class CustomResourceClassController {
  constructor(private readonly _Model: CustomResourceClassModel) {}

  @Post('/')
  public async create(
    @wValidatedArg(APOSTCustomResourceClassSchema)
    args: IAPOSTCustomResourceClass,
  ): Promise<IRPOSTCustomResourceClass> {
    const responseItem = new CustomResourceClass(args);
    await this._Model.addMany([responseItem]);
    return responseItem;
  }

  @Get('/')
  public async get(
    @wValidatedArg(AGETCustomResourceClassSchema)
    args: IAGETCustomResourceClass,
  ): Promise<IRGETCustomResourceClass> {
    return this._Model.getById(args._id);
  }

  @Get('/list/page')
  public async getListPage(
    @wValidatedArg(AGETCustomResourceClassListPageSchema)
    args: IAGETCustomResourceClassListPage,
  ): Promise<IRGETCustomResourceClassListPage> {
    return this._Model.getPage(args);
  }

  @Delete('/')
  public async delete(
    @wValidatedArg(ADELETECustomResourceClassSchema)
    args: IADELETECustomResourceClass,
  ): Promise<IRDELETECustomResourceClass> {
    return this._Model.deleteById(args._id);
  }
}
