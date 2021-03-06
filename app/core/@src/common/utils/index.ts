import * as fs from 'fs';
import CustomError from '../errors';
import { ErrorIds } from '../errors/messages';

export default class UtilsService {
  public static async readJSON<T>(path: string): Promise<T> {
    return new Promise((res, rej) =>
      fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err || !data) {
          rej(new CustomError(ErrorIds.DB.FileNotFound));
        } else {
          res(JSON.parse(data));
        }
      }),
    );
  }

  public static readJSONSync<T>(path: string): T {
    const response = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(response);
  }

  public static async writeJSON(args: {
    path: string;
    obj: any;
  }): Promise<void> {
    const { path, obj } = args;
    return new Promise((res, rej) =>
      fs.writeFile(path, JSON.stringify(obj), (err) => {
        err ? rej(err) : res();
      }),
    );
  }

  public static arrayToObject<T extends {}, K extends keyof T>(
    arr: T[],
    mainKey: K,
    allowMultiple?: false,
  ): { [key: string]: T | undefined };
  public static arrayToObject<T extends {}, K extends keyof T>(
    arr: T[],
    mainKey: K,
    allowMultiple: true,
  ): { [key: string]: T[] | undefined };
  public static arrayToObject<T extends {}, K extends keyof T>(
    arr: T[],
    mainKey: K,
    allowMultiple = false,
  ): { [key: string]: T | T[] | undefined } {
    const obj: { [key: string]: T | T[] | undefined } = {};
    if (!allowMultiple) {
      for (let i = 0; i < arr.length; ++i) {
        obj[arr[i][mainKey as any]] = arr[i];
      }
    } else {
      for (let i = 0; i < arr.length; ++i) {
        const key = arr[i][mainKey as any];
        if (!obj[key]) {
          obj[key] = [];
        }
        (obj[key] as T[]).push(arr[i]);
      }
    }
    return obj;
  }
}
