import Id from '../json-model/id';
import Joi from '@src/common/joi/extended';

// Identifier Having Resource
export interface IIdResource {
  _id: Id;
}

const IdResourceRawSchema = { _id: Joi.id().required() };
export const IdResourceSchema = Joi.object(IdResourceRawSchema);

// Timestamped Resource
export interface ITimestampedResource {
  createdAt: Date;
  updatedAt: Date;
}

const TimestampedResourceRawSchema = {
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
};
export const TimestampedResourceSchema = Joi.object(
  TimestampedResourceRawSchema,
);

// Minimal Default Resource
export type ITimestampedIdResource = ITimestampedResource & IIdResource;

export const TimestampedIdResourceSchema = Joi.object({
  ...TimestampedResourceRawSchema,
  ...IdResourceRawSchema,
});

export const TimestampedIdResourceKeys = ['_id', 'createdAt', 'updatedAt'];
