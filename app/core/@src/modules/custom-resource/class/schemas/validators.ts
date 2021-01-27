import {
  IdQuery,
  IdQuerySchema,
  PaginationQuery,
  PaginationQuerySchema,
} from '@src/common/interfaces/queries';
import {
  CustomResourceClassSchema,
  CustomResourceRowSchema,
  ICustomResourceClass,
  ICustomResourceRow,
} from './helper-schemas';
import Joi from '@src/common/joi/extended';
import { JoiForkUtils } from '@src/common/joi/utils';

// Post Common Resource Class
export type IAPOSTCustomResourceClass = {
  rows: Omit<ICustomResourceRow, '_id'>[];
};
export const APOSTCustomResourceClassSchema = Joi.object({
  rows: Joi.array()
    .items(CustomResourceRowSchema.fork('_id', JoiForkUtils.markKeysStripped))
    .required(),
});

export type IRPOSTCustomResourceClass = ICustomResourceClass;
export const RPOSTCustomResourceClassSchema = CustomResourceClassSchema;

// Get Single Common Resource Class By Id
export type IAGETCustomResourceClass = IdQuery;
export const AGETCustomResourceClassSchema = IdQuerySchema;

export type IRGETCustomResourceClass = ICustomResourceClass;
export const RGETCustomResourceClassSchema = CustomResourceClassSchema;

// Get Common Resource Class List Page
export type IAGETCustomResourceClassListPage = { pagination?: PaginationQuery };
export const AGETCustomResourceClassListPageSchema = Joi.object({
  pagination: PaginationQuerySchema.optional(),
});

export type IRGETCustomResourceClassListPage = ICustomResourceClass[];
export const RGETCustomResourceClassListPageSchem = Joi.array().items(
  CustomResourceClassSchema,
);

// DELETE Common Resource Class
export type IADELETECustomResourceClass = IdQuery;
export const ADELETECustomResourceClassSchema = IdQuerySchema;

export type IRDELETECustomResourceClass = ICustomResourceClass;
export const RDELETECustomResourceClassSchema = CustomResourceClassSchema;
