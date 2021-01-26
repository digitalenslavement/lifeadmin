import { Injectable } from '@nestjs/common';
import { OptionalKeys } from '@src/common/interfaces/generics';
import { ITimestampedIdResource } from '@src/common/interfaces/resources';
import JSONModel from '@src/common/json-model';
import JSONDocument from '@src/common/json-model/doc';
import Id from '@src/common/json-model/id';
import {
  ICustomResourceClass,
  ICustomResourceRow,
} from '../schemas/helper-schemas';

@Injectable()
export class CustomResourceClassModel extends JSONModel<
  ICustomResourceClass,
  typeof CustomResourceClass
> {
  constructor() {
    super({
      model: 'common-resource-class',
      instanceClass: CustomResourceClass,
    });
  }
}

export class CustomResourceClass
  extends JSONDocument
  implements ICustomResourceClass {
  public readonly rows: ICustomResourceClass['rows'];

  constructor(
    args: Omit<
      OptionalKeys<ICustomResourceClass, keyof ITimestampedIdResource>,
      'rows'
    > & { rows: OptionalKeys<ICustomResourceRow, '_id'>[] },
  ) {
    super(args);
    this.rows = args.rows.map((e) => ({ ...e, _id: new Id(e._id) }));
  }
}
