import JSONModel from '.';
import { OptionalKeys } from '../interfaces/generics';
import { ITimestampedIdResource } from '../interfaces/resources';
import Id from './id';

export default class JSONDocument implements ITimestampedIdResource {
  public readonly _id: Id;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    args: OptionalKeys<ITimestampedIdResource, keyof ITimestampedIdResource>,
  ) {
    this._id = new Id(args._id);
    this.createdAt = args.createdAt ?? new Date();
    this.updatedAt = args.updatedAt ?? new Date();
  }
}
