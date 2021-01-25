import { Injectable } from '@nestjs/common';
import { OptionalKeys } from 'src/common/interfaces/generics';
import { TimestampedIdResource } from 'src/common/interfaces/resources';
import JSONModel from 'src/common/json-model';
import JSONDocument from 'src/common/json-model/doc';
import { ICustomResourceClass } from '../schemas/helper-schemas';

@Injectable()
export class CustomResourceClassModel extends JSONModel<ICustomResourceClass> {
  constructor() {
    super({ model: 'common-resource-class' });
  }
}

export class CustomResourceClass
  extends JSONDocument
  implements ICustomResourceClass {
  public readonly rows: ICustomResourceClass["rows"]; 

  constructor(
    args: OptionalKeys<ICustomResourceClass, keyof TimestampedIdResource>,
  ) {
    super(args);
    this.rows = args.rows;
  }
}
