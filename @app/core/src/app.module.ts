import { Module } from '@nestjs/common';
import CustomResourceClassController from './modules/custom-resource/custom-resource-class/controller';
import CustomResourceClassModel from './modules/custom-resource/custom-resource-class/model/model';
import CommonResourceItemController from './modules/custom-resource/custom-resource-item/controller';
import CustomResourceItemModel from './modules/custom-resource/custom-resource-item/model/model';

@Module({
  imports: [],
  controllers: [CommonResourceItemController, CustomResourceClassController],
  providers: [CustomResourceClassModel, CustomResourceItemModel],
})
export class AppModule {}
