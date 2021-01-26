import { INestApplication } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import CustomResourceClassController from '@src/modules/custom-resource/class/controller';
import { CustomResourceRowType } from '@src/modules/custom-resource/class/schemas/helper-schemas';
import CustomResourceItemController from '@src/modules/custom-resource/item/controller';
import TestUtils from 'test/common/utils';

describe('Custom Resource Item', () => {
  let app: INestApplication;
  let classController: CustomResourceClassController;
  let itemController: CustomResourceItemController;

  beforeAll(async () => {
    app = await TestUtils.createApp();
    classController = AppModule.get(CustomResourceClassController);
    itemController = AppModule.get(CustomResourceItemController);
  });

  afterAll(async () => {});

  describe('CRUD Operations', () => {
    it('Creation', async (done) => {
      // Creating Class
      const itemClass = await classController.create({
        rows: [
          { label: 'Name', type: CustomResourceRowType.String },
          { label: 'Count', type: CustomResourceRowType.Number },
          {
            label: 'Nullable',
            type: CustomResourceRowType.Date,
            optional: true,
          },
        ],
      });

      // Creating Items

      // Must Fail For Empty Rows
      await expect(
        itemController.create({ class: itemClass._id, rows: [] }),
      ).rejects.toThrow();

      // Must Fail For Row Is Non Nullable
      await expect(
        itemController.create({
          class: itemClass._id,
          rows: [{ value: 'String' }, { value: null }, { value: new Date() }],
        }),
      ).rejects.toThrow();

      // Must Fail For Row Doesn't Satisfy Type
      await expect(
        itemController.create({
          class: itemClass._id,
          rows: [{ value: 'String' }, { value: 'str' }, { value: null }],
        }),
      ).rejects.toThrow();

      // Must Pass
      await Promise.all([
        expect(
          itemController.create({
            class: itemClass._id,
            rows: [{ value: 'String' }, { value: 1488 }, { value: null }],
          }),
        ).resolves.toBeTruthy(),
        expect(
          itemController.create({
            class: itemClass._id,
            rows: [
              { value: 'String' },
              { value: 1488 },
              { value: new Date().toString() },
            ],
          }),
        ).resolves.toBeTruthy(),
      ]);

      done();
    });
  });
});
