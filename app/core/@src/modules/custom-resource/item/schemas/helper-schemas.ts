import {
  IdResourceSchema,
  TimestampedIdResource,
  TimestampedIdResourceSchema,
} from '@src/common/interfaces/resources';
import {
  ICustomResourceRow,
  ICustomResourceRowTypeValue,
} from '../../class/schemas/helper-schemas';
import Id from '@src/common/json-model/id';
import Joi from '@src/common/joi/extended';

// Custom Resource Item Row
export interface ICustomResourceItemRow
  extends Pick<ICustomResourceRow, '_id'> {
  value: ICustomResourceRowTypeValue[keyof ICustomResourceRowTypeValue];
}

export const CustomResourceItemRowSchema = IdResourceSchema.keys({
  value: Joi.alternatives(Joi.string(), Joi.number(), Joi.date()).required(),
});

// Custom Resource Item
export interface ICustomResourceItem extends TimestampedIdResource {
  class: Id;
  rows: ICustomResourceItemRow[];
}

export const CustomResourceItemSchema = TimestampedIdResourceSchema.keys({
  class: Joi.id().required(),
  rows: Joi.array().items(CustomResourceItemRowSchema).required(),
});
