import { TimestampedIdResource } from '@src/common/interfaces/resources';
import { ICustomResourceRow } from '../../custom-resource-class/schemas/helper-schemas';

// Common Resource Item
export interface ICustomResourceItem extends TimestampedIdResource {
  class: string;
  rows: ICustomResourceRow;
}
