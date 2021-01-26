import * as Joi from '@hapi/joi';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JoiValidationUtils } from './utils';

type ReqPart = 'params' | 'query' | 'body';
type Data = Joi.Schema | [Joi.Schema, ReqPart | ReqPart[]];
const defaultReqPart: ReqPart[] = ['params', 'query', 'body'];

/**
 * Parses Request Data And Validates Against Schema
 */
export const wValidatedArg = createParamDecorator(
  (data: Data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const schema = Array.isArray(data) ? data[0] : data;
    const reqPart =
      (Array.isArray(data) ? data[1] : defaultReqPart) || defaultReqPart;
    const object = getObject(req, reqPart);
    return JoiValidationUtils.assertMatchesSchema(object, schema);
  },
);

function getObject(
  req: Request,
  reqPart: ReqPart | ReqPart[] = ['params', 'query', 'body'],
) {
  if (Array.isArray(reqPart)) {
    reqPart = reqPart.filter((part) => {
      const data = req[part];
      if (data === null || data === undefined) {
        return false;
      }
      if (!Array.isArray(data) && typeof data === 'object') {
        if (Object.keys(data).length === 0) return false;
      }
      return true;
    });
    if (reqPart.length === 1) {
      reqPart = reqPart[0];
    }
  }
  let object: Record<any, any> = {};
  if (typeof reqPart === 'string') {
    object = req[reqPart];
  } else {
    for (let i = 0; i < reqPart.length; ++i) {
      Object.assign(object, req[reqPart[i]]);
    }
  }
  return object;
}
