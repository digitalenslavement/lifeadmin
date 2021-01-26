import { Injectable } from '@nestjs/common';
import { OptionalKeys } from '@src/common/interfaces/generics';
import { TimestampedIdResource } from '@src/common/interfaces/resources';
import JSONModel from '@src/common/json-model';
import JSONDocument from '@src/common/json-model/doc';
import { CustomResourceClass } from '../../class/model/model';
import { ICustomResourceItem } from '../schemas/helper-schemas';

@Injectable()
export default class CustomResourceItemModel extends JSONModel<
  ICustomResourceItem,
  typeof CustomResourceItem
> {
  constructor() {
    super({ model: 'common-resource-item', instanceClass: CustomResourceItem });
  }
}

export class CustomResourceItem
  extends JSONDocument
  implements ICustomResourceItem {
  public readonly _id: ICustomResourceItem['_id'];
  public readonly class: ICustomResourceItem['class'];
  public readonly rows: ICustomResourceItem['rows'];

  constructor(
    args: OptionalKeys<ICustomResourceItem, keyof TimestampedIdResource>,
  ) {
    super(args);
    this._id = args._id;
    this.class = args.class;
    this.rows = args.rows;
  }
}
