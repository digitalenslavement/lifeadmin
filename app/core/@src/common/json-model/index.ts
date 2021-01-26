import { AppModule } from '@src/app.module';
import CustomError from '../errors';
import { ErrorIds } from '../errors/messages';
import { PaginationQuery } from '../interfaces/queries';
import { IIdResource } from '../interfaces/resources';
import UtilsService from '../utils';
import PaginationService from '../utils/pagination';
import JSONDocument from './doc';
import Id from './id';

export default class JSONModel<
  T extends JSONDocument,
  IC extends new (arg: any) => T
> {
  protected readonly instanceClass: IC;
  protected readonly model: string;
  protected readonly path: string;

  constructor(args: { model: string; instanceClass: IC }) {
    this.model = args.model;
    this.path = '@src/' + AppModule._CONFIG.db_path + `/${this.model}.json`;
    this.instanceClass = args.instanceClass;
  }

  public async addMany(rawAddItems: T[]): Promise<T[]> {
    this.assertDuplicateIds(rawAddItems);

    const addItems = this.toInstance(rawAddItems);
    const allItems = await this.getAll();
    const idSet = this.getIdsSet(allItems);

    if (addItems.some((e) => e._id.in(idSet))) {
      throw new CustomError(ErrorIds.DB.DuplicateID);
    }

    const responseItems = [...allItems, ...addItems];
    await this.writeItems(responseItems);
    return responseItems;
  }

  public async getAll(): Promise<T[]> {
    const { items } = await UtilsService.readJSON<{ items: T[] }>(
      this.path,
    ).catch((e) => {
      if (e instanceof CustomError && e._id === ErrorIds.DB.FileNotFound) {
        return { items: [] };
      } else {
        throw e;
      }
    });

    return this.toInstance(items);
  }

  public async getById(_id: string | Id): Promise<T> {
    const allItems = await this.getAll();
    return this.findById(allItems, _id, true);
  }

  public async getPage(
    paginationQuery: PaginationQuery,
    filter?: (items: T[]) => T[],
  ): Promise<T[]> {
    const allItems = await this.getAll();
    let filteredItems = filter ? filter(allItems) : allItems;
    return PaginationService.paginate({
      items: filteredItems,
      paginationQuery,
    });
  }

  public async editMany(rawEditItems: T[]): Promise<T[]> {
    this.assertDuplicateIds(rawEditItems);
    const editItems = this.toInstance(rawEditItems);
    const allItems = await this.getAll();
    const editById = UtilsService.arrayToObject(editItems, '_id');

    let responseItems: T[] = [];
    for (const item of allItems) {
      const editedItem = editById[item._id.id];
      responseItems.push(editedItem ?? item);
    }

    await this.writeItems(responseItems);
    return responseItems;
  }

  public async deleteById(id: Id | string): Promise<T> {
    const items = await this.getAll();
    const item = this.findById(items, id, true);
    await this.writeItems(items.filter((e) => !e._id.equals(id)));
    return item;
  }

  public async deleteMany(ids: (Id | string)[]): Promise<T[]> {
    const idsSet = new Set(ids.map((e) => e.toString()));
    const allItems = await this.getAll();
    const response = allItems.filter((e) => !e._id.in(idsSet));
    await this.writeItems(response);
    return response;
  }

  private async writeItems(items: T[]): Promise<void> {
    return UtilsService.writeJSON({ obj: { items }, path: this.path });
  }

  private findById(items: T[], id: Id | string, throwIfNotFound: true): T;
  private findById(
    items: T[],
    id: Id | string,
    throwIfNotFound?: false,
  ): T | null;
  private findById(
    items: T[],
    id: Id | string,
    throwIfNotFound?: boolean,
  ): T | null {
    const item = items.find((e) => e._id.equals(id));
    if (!item && throwIfNotFound)
      throw new CustomError(ErrorIds.DB.RecordNotFound);
    return item ?? null;
  }

  private getIdsSet(
    items: IIdResource[],
    assertDuplicateIds: boolean = true,
  ): Set<string> {
    const idsSet = new Set<string>();
    for (const item of items) {
      if (assertDuplicateIds && item._id.in(idsSet))
        throw new CustomError(ErrorIds.DB.DuplicateID);
      idsSet.add(item._id.id);
    }
    return idsSet;
  }

  private assertDuplicateIds(items: IIdResource[]) {
    this.getIdsSet(items, true);
  }

  private toInstance(item: T): T;
  private toInstance(items: T[]): T[];
  private toInstance(items: T | T[]): T | T[] {
    return Array.isArray(items)
      ? items.map((e) => new this.instanceClass(e))
      : new this.instanceClass(items);
  }
}
