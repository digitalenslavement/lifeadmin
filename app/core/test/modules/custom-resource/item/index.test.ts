import { INestApplication } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { TimestampedIdResource } from '@src/common/interfaces/resources';
import CustomResourceClassController from '@src/modules/custom-resource/class/controller';
import { CustomResourceRowType } from '@src/modules/custom-resource/class/schemas/helper-schemas';
import CommonResourceItemController from '@src/modules/custom-resource/item/controller';
import { ICustomResourceItem } from '@src/modules/custom-resource/item/schemas/helper-schemas';
import TestUtils from 'test/common/utils';

describe('Custom Resource Item', () => {
  let app: INestApplication;
  let classController: CustomResourceClassController;
  let itemController: CommonResourceItemController;

  beforeAll(async () => {
    app = await TestUtils.createApp();
    classController = AppModule.get(CustomResourceClassController);
    itemController = AppModule.get(CommonResourceItemController);
  });

  afterAll(async () => {});

