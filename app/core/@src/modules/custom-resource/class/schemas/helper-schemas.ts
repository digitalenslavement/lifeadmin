import {
  IdResourceSchema,
  ITimestampedIdResource,
} from '@src/common/interfaces/resources';
import Id from '@src/common/json-model/id';
import Joi from '@src/common/joi/extended';

// Common Resource Class Row Type
export enum CustomResourceRowType {
  String = 'String',
  Number = 'Number',
  Date = 'Date',
}
export const CustomResourceRowTypes = Object.values(CustomResourceRowType);
export interface ICustomResourceRowTypeValue {
  [CustomResourceRowType.String]: string;
  [CustomResourceRowType.Number]: number;
  [CustomResourceRowType.Date]: Date;
}

// Common Resource Class Row Schema
export interface ICustomResourceRow {
  _id: Id;
  type: CustomResourceRowType;
  label: string;
  optional?: boolean;
}
export const CustomResourceRowSchema = IdResourceSchema.keys({
  type: Joi.string()
    .valid(...CustomResourceRowTypes)
    .required(),
  label: Joi.string().required(),
  optional: Joi.boolean(),
});

// Common Resource Class Schema
export interface ICustomResourceClass extends ITimestampedIdResource {
  rows: ICustomResourceRow[];
}
export const CustomResourceClassSchema = Joi.object({
  rows: Joi.array().items(CustomResourceRowSchema).min(1).required(),
});
