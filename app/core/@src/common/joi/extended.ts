import * as OriginalJoi from '@hapi/joi';
import { AnySchema } from '@hapi/joi';
import Id from '../json-model/id';

interface IExtendedJoi extends OriginalJoi.Root {
  id(): AnySchema;
}

const ExtendedJoi: IExtendedJoi = OriginalJoi.extend({
  type: 'id',
  messages: {
    'id.base': 'id has to be a string',
  },
  validate(value: unknown, helpers: any) {
    const isRequired = helpers.schema._flags.presence === 'required';
    const error = helpers.error('objectId.base');

    const getError = (value: unknown) => {
      if (!isRequired && value === undefined) return null;
      if (typeof value !== 'string' || !value) {
        console.trace('Validation Error: Id must be a string');
        return error;
      }
      return null;
    };

    const responseValue = new Id(value as string);

    return {
      value: responseValue,
      errors: getError(value),
    };
  },
});

export { ExtendedJoi, IExtendedJoi };
export default ExtendedJoi;
