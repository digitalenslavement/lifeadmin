import Id from '../json-model/id';
import Joi from '@src/common/joi/extended';

// Identifier Having Resource
export interface IdResource {
  _id: Id;
}

export const IdResourceSchema = Joi.object({
  _id: Joi.id().required(),
});

// Minimal Default Resource
export interface TimestampedIdResource extends IdResource {
  createdAt: Date;
  updatedAt: Date;
}

export const TimestampedIdResourceSchema = IdResourceSchema.keys({
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const TimestampedIdResourceKeys = ['_id', 'createdAt', 'updatedAt'];
