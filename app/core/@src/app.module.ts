import { Module } from '@nestjs/common';
import { IConfig } from './common/config/interface';
import UtilsService from './common/utils';
import CustomResourceClassController from './modules/custom-resource/custom-resource-class/controller';
import { CustomResourceClassModel } from './modules/custom-resource/custom-resource-class/model/model';
import CommonResourceItemController from './modules/custom-resource/custom-resource-item/controller';
import CustomResourceItemModel from './modules/custom-resource/custom-resource-item/model/model';

@Module({
  imports: [],
  controllers: [CommonResourceItemController, CustomResourceClassController],
  providers: [CustomResourceItemModel, CustomResourceClassModel],
})
export class AppModule {
  public static readonly _CONFIG: IConfig = UtilsService.readJSONSync('@src/common/config/index.json');
}
