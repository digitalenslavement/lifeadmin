import {
  PaginationQuery,
  PaginationQuerySchema,
} from '@src/common/interfaces/queries';
import {
  TimestampedIdResource,
  IdResource,
  IdResourceSchema,
  TimestampedIdResourceKeys,
} from '@src/common/interfaces/resources';
import Id from '@src/common/json-model/id';
import {
  CustomResourceItemSchema,
  ICustomResourceItem,
} from './helper-schemas';
import Joi from '@src/common/joi/extended';
import { JoiForkUtils } from '@src/common/joi/utils';

// POST Create Common Resource Item
export type IAPOSTCustomResourceItem = Omit<
  ICustomResourceItem,
  keyof TimestampedIdResource
>;
export const APOSTCustomResourceItemSchema = CustomResourceItemSchema.fork(
  TimestampedIdResourceKeys,
  JoiForkUtils.markKeysStripped,
);

export type IRPOSTCustomResourceItem = ICustomResourceItem;

// GET Common Resource Item
export type IAGETCustomResourceItem = IdResource;
export const AGETCustomResourceItemSchema = IdResourceSchema;

export type IRGETCustomResourceItem = ICustomResourceItem;
export const RGETCustomResourceItemSchema = CustomResourceItemSchema;

// GET Common Resource Item List Page
export type IAGETCustomResourceItemListPage = {
  pagination: PaginationQuery;
  class: Id;
};
export const AGETCustomREsourceItemListPageSchema = Joi.object({
  pagination: PaginationQuerySchema.required(),
  class: Joi.id().required(),
});

export type IRGETCustomResourceItemListPage = ICustomResourceItem[];
export const RGETCustomResourceItemListPageSchema = CustomResourceItemSchema;

// DELETE Common Resource Item
export type IADELETECustomResourceItem = IdResource;
export const ADELETECustomResourceItemSchema = IdResourceSchema;

export type IRDELETECustomResourceItem = ICustomResourceItem;
export const RDELETECustomResourceItem = CustomResourceItemSchema;
