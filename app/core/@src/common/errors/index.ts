export default class CustomError extends Error {
  constructor(public readonly _id: string) {
    super();
  }
}
