import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  Type,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IConfig } from './common/config/interface';
import UtilsService from './common/utils';
import CustomResourceClassController from './modules/custom-resource/class/controller';
import { CustomResourceClassModel } from './modules/custom-resource/class/model/model';
import CustomResourceItemController from './modules/custom-resource/item/controller';
import CustomResourceItemModel from './modules/custom-resource/item/model/model';
import CustomResourceItemService from './modules/custom-resource/item/services';

@Module({
  imports: [],
  controllers: [CustomResourceItemController, CustomResourceClassController],
  providers: [
    CustomResourceItemModel,
    CustomResourceClassModel,
    CustomResourceItemService,
  ],
})
export class AppModule implements NestModule {
  private static moduleRef: ModuleRef;
  public static readonly _CONFIG: IConfig = UtilsService.readJSONSync(
    '@src/common/config/index.json',
  );

  constructor(@Inject(ModuleRef) moduleRef: ModuleRef) {
    AppModule.moduleRef = moduleRef;
  }

  public static get<T>(arg: string | symbol | Type<T>) {
    return AppModule.moduleRef.get<T>(arg);
  }

  public configure() {}
}
