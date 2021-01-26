import { Injectable } from '@nestjs/common';
import { OptionalKeys } from '@src/common/interfaces/generics';
import {
  ITimestampedIdResource,
  ITimestampedResource,
} from '@src/common/interfaces/resources';
import JSONModel from '@src/common/json-model';
import JSONDocument from '@src/common/json-model/doc';
import Id from '@src/common/json-model/id';
import { CustomResourceClass } from '../../class/model/model';
import {
  CustomResourceRowType,
  ICustomResourceClass,
} from '../../class/schemas/helper-schemas';
import {
  ICustomResourceItem,
  ICustomResourceItemRow,
} from '../schemas/helper-schemas';

@Injectable()
export default class CustomResourceItemModel extends JSONModel<
  ICustomResourceItem,
  typeof CustomResourceItem
> {
  constructor() {
    super({ model: 'common-resource-item', instanceClass: CustomResourceItem });
  }
}

// Model Instance Class
export class CustomResourceItem
  extends JSONDocument
  implements ICustomResourceItem {
  public readonly _id: ICustomResourceItem['_id'];
  public readonly class: ICustomResourceItem['class'];
  public readonly rows: ICustomResourceItem['rows'];
  public readonly createdAt: ICustomResourceItem['createdAt'];
  public readonly updatedAt: ICustomResourceItem['updatedAt'];

  constructor(
    args: OptionalKeys<ICustomResourceItem, keyof ITimestampedIdResource>,
  ) {
    super(args);
    this._id = new Id(args._id);
    this.createdAt = args.createdAt ?? new Date();
    this.updatedAt = args.updatedAt ?? new Date();

    this.class = args.class;
    this.rows = args.rows;
  }

  public static prepareRows(args: {
    rows: (ICustomResourceItemRow | null)[];
    itemClass: ICustomResourceClass;
  }): ICustomResourceItemRow[] {
    const { rows, itemClass } = args;

    const response: (ICustomResourceItemRow | null)[] = [];
    for (let i = 0; i < rows.length; ++i) {
      const row = rows[i];
      const rowType = itemClass.rows[i];
      if (row === null || rowType.type !== CustomResourceRowType.Date) {
        response.push(row);
      } else {
        response.push({ ...row, value: new Date(row.value) });
      }
    }

    return response;
  }
}
