import { Injectable } from '@nestjs/common';
import JSONModel from 'src/common/json-model';
import { ICustomResourceItem } from '../schemas/helper-schemas';

@Injectable()
export default class CustomResourceItemModel extends JSONModel<ICustomResourceItem> {
  constructor() {
    super({ model: 'common-resource-item' });
  }
}
