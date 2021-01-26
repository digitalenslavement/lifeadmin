import { TimestampedIdResource } from '@src/common/interfaces/resources';
import Id from '@src/common/json-model/id';

// Common Resource Class Row Type
export enum CustomResourceRowType {
  String = 'String',
  Number = 'Number',
  Date = 'Date',
}
export interface ICustomResourceRowTypeValue {
  [CustomResourceRowType.String]: string;
  [CustomResourceRowType.Number]: number;
  [CustomResourceRowType.Date]: Date;
}

// Common Resource Class Row Schema
export interface ICustomResourceRow {
  _id: Id;
  type: CustomResourceRowType;
  label: string;
}

// Common Resource Class Schema
export interface ICustomResourceClass extends TimestampedIdResource {
  rows: ICustomResourceRow[];
}
