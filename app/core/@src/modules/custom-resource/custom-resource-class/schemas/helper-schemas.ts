import { TimestampedIdResource } from "@src/common/interfaces/resources";

// Common Resource Class Row Type
export enum CustomResourceRowType {
  String = 'String',
  Number = 'Number',
  Date = 'Date',
}

// Common Resource Class Row Schema
export interface ICustomResourceRow {
  type: CustomResourceRowType;
  label: string;
}

// Common Resource Class Schema
export interface ICustomResourceClass extends TimestampedIdResource {
  rows: ICustomResourceRow[];
}
