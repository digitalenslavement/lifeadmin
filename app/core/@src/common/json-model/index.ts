import { AppModule } from '@src/app.module';
import CustomError from '../errors';
import { ErrorIds } from '../errors/messages';
import { PaginationQuery } from '../interfaces/queries';
import { IdResource } from '../interfaces/resources';
import UtilsService from '../utils';
import PaginationService from '../utils/pagination';

export default class JSONModel<T extends IdResource> {
  protected readonly model: string;
  protected readonly path: string;

  constructor(args: { model: string }) {
    this.model = args.model;
    this.path = '@src/' + AppModule._CONFIG.db_path + `/${this.model}.json`;
  }

  public async addMany(addItems: T[]): Promise<T[]> {
    const idsSet = this.getIdsSet(addItems);

    const allItems = await this.getAll();
    if (allItems.some((e) => idsSet.has(e._id)))
      throw new CustomError(ErrorIds.DB.DuplicateID);

    const responseItems = [...allItems, ...addItems];
    await this.writeItems(responseItems);
    return responseItems;
  }

  public async getAll(): Promise<T[]> {
    const { items } = await UtilsService.readJSON<{ items: T[] }>(
      this.path,
    ).catch((e) => {
      if (e instanceof CustomError && e._id === ErrorIds.DB.FileNotFound)
        return { items: [] };
      throw e;
    });
    return items;
  }

  public async getById(_id: string): Promise<T> {
    const item = (await this.getAll()).find((e) => e._id === _id);
    if (!item) throw new CustomError(ErrorIds.DB.RecordNotFound);
    return item;
  }

  public async getPage(
    paginationQuery: PaginationQuery,
    filter?: (items: T[]) => T[],
  ): Promise<T[]> {
    const allItems = await this.getAll();
    let filteredItems = filter ? filter(allItems) : allItems;
    const responseItems = PaginationService.paginate({
      items: filteredItems,
      paginationQuery,
    });
    return responseItems;
  }

  public async editMany(editItems: T[]): Promise<T[]> {
    const idsSet = this.getIdsSet(editItems);
    const allItems = await this.getAll();

    const itemById = UtilsService.arrayToObject(editItems, '_id');
    let responseItems: T[] = [];
    for (const item of allItems) {
      const editedItem = itemById[item._id];
      responseItems.push(editedItem ?? item);
    }

    await this.writeItems(responseItems);
    return responseItems;
  }

  public async deleteById(id: string): Promise<T> {
    const items = await this.getAll();
    const item = items.find((e) => e._id === id);
    if (!item) throw new CustomError(ErrorIds.DB.RecordNotFound);
    await this.writeItems(items.filter((e) => !(e._id === id)));
    return item;
  }

  public async deleteMany(ids: string[]): Promise<T[]> {
    const idsSet = new Set(ids);
    const items = await this.getAll().then((res) =>
      res.filter((e) => !idsSet.has(e._id)),
    );
    await this.writeItems(items);
    return items;
  }

  private async writeItems(items: T[]): Promise<void> {
    return UtilsService.writeJSON({ obj: { items }, path: this.path });
  }

  private getIdsSet(items: T[]): Set<string> {
    const idsSet = new Set<string>();
    for (const item of items) {
      if (idsSet.has(item._id)) throw new CustomError(ErrorIds.DB.DuplicateID);
      idsSet.add(item._id);
    }
    return idsSet;
  }
}
