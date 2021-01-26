import { TimestampedIdResource } from '@src/common/interfaces/resources';
import {
  CustomResourceRowType,
  ICustomResourceRow,
  ICustomResourceRowTypeValue,
} from '../../class/schemas/helper-schemas';

// Custom Resource Item Row
export interface ICustomResourceItemRow
  extends Pick<ICustomResourceRow, '_id'> {
  value: ICustomResourceRowTypeValue[keyof ICustomResourceRowTypeValue];
}

// Custom Resource Item
export interface ICustomResourceItem extends TimestampedIdResource {
  class: string;
  rows: ICustomResourceItemRow[];
}
