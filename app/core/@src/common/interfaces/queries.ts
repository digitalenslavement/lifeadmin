import { IIdResource, IdResourceSchema } from './resources';
import Joi from '@src/common/joi/extended';

// Pagination Query
export interface PaginationQuery {
  page: number;
  numItems: number;
}
export const PaginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(0).required(),
  numItems: Joi.number().integer().min(0).required(),
});

// Id Query
export type IdQuery = IIdResource;
export const IdQuerySchema = IdResourceSchema;
