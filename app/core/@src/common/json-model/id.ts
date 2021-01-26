export default class Id {
  public readonly id: string;

  constructor(_id?: string | number | null | undefined) {
    this.id = _id ? this.prepareIdArg(_id) : this._newId();
  }

  public equals(id: string | number): boolean {
    return this.prepareIdArg(id) === this.id;
  }

  private prepareIdArg(_id: string | number): string {
    return _id.toString().trim();
  }

  private _newId(): string {
    const randStr = () => Math.floor(Math.random() * 99999).toString();
    return randStr() + new Date().getTime().toString() + randStr();
  }
}
