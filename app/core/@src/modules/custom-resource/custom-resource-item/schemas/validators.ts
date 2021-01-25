import { PaginationQuery } from '@src/common/interfaces/queries';
import { TimestampedIdResource, IdResource } from '@src/common/interfaces/resources';
import { ICustomResourceItem } from './helper-schemas';

// POST Create Common Resource Item
export type IAPOSTCustomResourceItem = Omit<
  ICustomResourceItem,
  keyof TimestampedIdResource
>;

export type IRPOSTCustomResourceItem = ICustomResourceItem;

// GET Common Resource Item
export type IAGETCustomResourceItem = IdResource;

export type IRGETCustomResourceItem = ICustomResourceItem;

// GET Common Resource Item List Page
export type IAGETCustomResourceItemListPage = PaginationQuery;

export type IRGETCustomResourceItemListPage = ICustomResourceItem[];

// DELETE Common Resource Item
export type IADELETECustomResourceItem = IdResource;

export type IRDELETECustomResourceItem = ICustomResourceItem;
