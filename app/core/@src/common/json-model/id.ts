export interface IId {
  id: string;
}

export default class Id implements IId {
  public readonly id: string;

  constructor(_id?: Id | IId | string | number | null | undefined) {
    this.id = _id ? this.prepareIdArg(_id) : this._newId();
  }

  public in(ids: Set<string> | Id[]): boolean {
    const set = Array.isArray(ids) ? new Set(ids.map((e) => e.id)) : ids;
    if (set.has(this.id)) return true;
    return false;
  }

  public toString(): string {
    return this.id;
  }

  public equals(id: string | number | Id): boolean {
    return this.prepareIdArg(id) === this.id;
  }

  private prepareIdArg(_id: string | number | Id | IId): string {
    if (this.implementsId(_id)) return _id.id;
    const stringified = _id.toString().trim();
    return stringified;
  }

  private _newId(): string {
    const randStr = () => Math.floor(Math.random() * 99999).toString();
    return randStr() + new Date().getTime().toString() + randStr();
  }

  public implementsId(id: any): id is IId {
    return 'id' in id && typeof id.id === 'string';
  }
}
