import { PaginationQuery } from '../interfaces/queries';

export default class PaginationService {
  public static paginate<T>(args: {
    items: T[];
    paginationQuery: PaginationQuery;
  }): T[] {
    const {
      items,
      paginationQuery: { numItems, page },
    } = args;
    const start = numItems * page;
    const end = start + numItems;

    return items.slice(numItems * page, end);
  }
}
