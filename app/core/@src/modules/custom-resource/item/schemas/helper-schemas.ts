import { TimestampedIdResource } from '@src/common/interfaces/resources';
import { ICustomResourceRow } from '../../class/schemas/helper-schemas';

// Common Resource Item
export interface ICustomResourceItem extends TimestampedIdResource {
  class: string;
  rows: ICustomResourceRow;
}
