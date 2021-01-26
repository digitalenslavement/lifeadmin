import { INestApplication } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import CustomResourceClassController from '@src/modules/custom-resource/class/controller';
import { CustomResourceRowType } from '@src/modules/custom-resource/class/schemas/helper-schemas';
import TestUtils from 'test/common/utils';

describe('Custom Resource Class', () => {
  let app: INestApplication;
  let controller: CustomResourceClassController;

  beforeAll(async () => {
    app = await TestUtils.createApp();
    controller = AppModule.get(CustomResourceClassController);
  });

  afterAll(async () => {});

  describe('CRUD Operations', () => {
    it('Create', async (done) => {
      const args = {
        rows: [
          { label: 'Name', type: CustomResourceRowType.String },
          { label: 'Count', type: CustomResourceRowType.Number },
        ],
      };

      const createdDoc = await controller.create(args);
      const retreivedDoc = await controller.get({ _id: createdDoc._id });

      expect(retreivedDoc._id === createdDoc._id).toBeTruthy();
      expect(
        retreivedDoc.rows.every(
          (e, i) =>
            createdDoc.rows[i].label === e.label &&
            createdDoc.rows[i].type === e.type,
        ),
      ).toBeTruthy();

      done();
    });
  });
});
