import { IdQuery, PaginationQuery } from '@src/common/interfaces/queries';
import { ICustomResourceClass } from './helper-schemas';

// Post Common Resource Class
export type IAPOSTCustomResourceClass = Omit<ICustomResourceClass, '_id'>;

export type IRPOSTCustomResourceClass = ICustomResourceClass;

// Get Single Common Resource Class By Id
export type IAGETCustomResourceClass = IdQuery;

export type IRGETCustomResourceClass = ICustomResourceClass;

// Get Common Resource Class List Page
export type IAGETCustomResourceClassListPage = PaginationQuery;

export type IRGETCustomResourceClassListPage = ICustomResourceClass[];

// DELETE Common Resource Class
export type IADELETECustomResourceClass = IdQuery;

export type IRDELETECustomResourceClass = ICustomResourceClass;
