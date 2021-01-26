import { Injectable } from '@nestjs/common';
import CustomError from '@src/common/errors';
import { ErrorIds } from '@src/common/errors/messages';
import { OptionalKeys } from '@src/common/interfaces/generics';
import { ITimestampedIdResource } from '@src/common/interfaces/resources';
import Id from '@src/common/json-model/id';
import { CustomResourceClassModel } from '../../class/model/model';
import {
  CustomResourceRowType,
  ICustomResourceClass,
  ICustomResourceRow,
} from '../../class/schemas/helper-schemas';
import { CustomResourceItem } from '../model/model';
import {
  ICustomResourceItem,
  ICustomResourceItemRow,
} from '../schemas/helper-schemas';

type IRawItem = OptionalKeys<ICustomResourceItem, keyof ITimestampedIdResource>;

@Injectable()
export default class CustomResourceItemService {
  constructor(private readonly _ClassModel: CustomResourceClassModel) {}

  public wPreparedRows(args: {
    rawItems: IRawItem;
    itemClassId: Id;
  }): Promise<ICustomResourceItem>;
  public wPreparedRows(args: {
    rawItems: IRawItem;
    itemClassId: Id;
    itemClass: ICustomResourceClass;
  }): ICustomResourceItem;
  public wPreparedRows(args: {
    rawItems: IRawItem[];
    itemClassId: Id;
  }): Promise<ICustomResourceItem[]>;
  public wPreparedRows(args: {
    rawItems: IRawItem[];
    itemClassId: Id;
    itemClass: ICustomResourceClass;
  }): ICustomResourceItem[];
  public wPreparedRows(args: {
    rawItems: IRawItem | IRawItem[];
    itemClassId: Id;
    itemClass?: ICustomResourceClass;
  }):
    | ICustomResourceItem
    | ICustomResourceItem[]
    | Promise<ICustomResourceItem | ICustomResourceItem[]> {
    const isArray = Array.isArray(args.rawItems);
    const rawItems = (isArray ? args.rawItems : [args.rawItems]) as IRawItem[];

    const toResponse = (response: ICustomResourceItem[]) =>
      isArray ? response : response[0];
    const handleRawItems = (itemClass: ICustomResourceClass) => {
      const response: ICustomResourceItem[] = [];

      for (const rawItem of rawItems) {
        const preparedRows = CustomResourceItem.prepareRows({
          rows: rawItem.rows,
          itemClass: args.itemClass,
        });
        const item = new CustomResourceItem({
          ...rawItem,
          rows: preparedRows,
        });

        response.push(item);
      }

      return response;
    };

    if (!args.itemClass) {
      const promise = this._ClassModel.getById(args.itemClassId).then((res) => {
        const rawResponse = handleRawItems(res);
        return toResponse(rawResponse);
      });
      return promise;
    } else {
      return toResponse(handleRawItems(args.itemClass));
    }
  }

  public assertSatisfiesClass(args: {
    class: ICustomResourceClass;
    items: ICustomResourceItem[];
  }) {
    const { class: itemClass, items } = args;
    for (const { rows } of items) {
      if (!rows.length && itemClass.rows.length) {
        throw new CustomError(ErrorIds.CustomResource.ItemNotSatisfyingClass);
      }

      for (let i = 0; i < rows.length; ++i) {
        const row = rows[i];
        this.assertRow({ row, idx: i, itemClass });
      }
    }
  }

  private assertRow(args: {
    row: ICustomResourceItemRow;
    idx: number;
    itemClass: ICustomResourceClass;
  }) {
    const { row, idx } = args;
    const { value } = row;
    const rowType = args.itemClass.rows[idx];

    const rowEmpty = value === undefined && rowType !== undefined;
    const rowNonEmpty = rowType === undefined && value !== undefined;
    const rowMissing = value === null && !rowType.optional;

    if (rowEmpty || rowNonEmpty || rowMissing) {
      throw new CustomError(ErrorIds.CustomResource.ItemNotSatisfyingClass);
    } else if (value !== null) {
      this.assertRowTypeDoesntSatisfy({ row, rowType });
    }
  }

  private assertRowTypeDoesntSatisfy(args: {
    row: ICustomResourceItemRow;
    rowType: ICustomResourceRow;
  }) {
    const {
      row: { value },
      rowType: { type },
    } = args;

    const notDate =
      type === CustomResourceRowType.Date && !(value instanceof Date);
    const notNumber =
      type === CustomResourceRowType.Number && typeof value !== 'number';
    const notString =
      type === CustomResourceRowType.String && typeof value !== 'string';

    if (notDate || notNumber || notString) {
      throw new CustomError(ErrorIds.CustomResource.ItemNotSatisfyingClass);
    }
  }
}
