import { IdResource } from "./resources";

// Pagination Query
export interface PaginationQuery {
  page: number;
  numItems: number;
}

// Id Query
export type IdQuery = IdResource;
