import {
  IdResourceSchema,
  ITimestampedIdResource,
  ITimestampedResource,
  TimestampedIdResourceSchema,
  TimestampedResourceSchema,
} from '@src/common/interfaces/resources';
import {
  ICustomResourceRow,
  ICustomResourceRowTypeValue,
} from '../../class/schemas/helper-schemas';
import Id from '@src/common/json-model/id';
import Joi from '@src/common/joi/extended';

// Custom Resource Item Row
export interface ICustomResourceItemRow {
  value: ICustomResourceRowTypeValue[keyof ICustomResourceRowTypeValue];
}

export const CustomResourceItemRowSchema = Joi.object({
  value: Joi.alternatives(Joi.string(), Joi.number(), Joi.date()).required(),
});

// Custom Resource Item
export interface ICustomResourceItem extends ITimestampedIdResource {
  class: Id;
  rows: (ICustomResourceItemRow | null)[];
}

export const CustomResourceItemSchema = TimestampedIdResourceSchema.keys({
  class: Joi.id().required(),
  rows: Joi.array()
    .items(CustomResourceItemRowSchema)
    .allow(null)
    .min(1)
    .required(),
});
