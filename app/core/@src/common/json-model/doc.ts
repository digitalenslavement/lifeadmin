import JSONModel from '.';
import { OptionalKeys } from '../interfaces/generics';
import { TimestampedIdResource } from '../interfaces/resources';
import Id from './id';

export default class JSONDocument implements TimestampedIdResource {
  public readonly _id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    args: OptionalKeys<TimestampedIdResource, keyof TimestampedIdResource>,
  ) {
    this._id = args._id ?? new Id().id;
    this.createdAt = args.createdAt ?? new Date();
    this.updatedAt = args.updatedAt ?? new Date();
  }
}
