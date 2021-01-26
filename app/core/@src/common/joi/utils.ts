import { AnySchema, ValidationOptions } from '@hapi/joi';

export class JoiForkUtils {
  public static markKeysStripped(schema: AnySchema) {
    return schema.optional().strip();
  }
}

export class JoiValidationUtils {
  public static assertMatchesSchema<T>(
    obj: T,
    schema: AnySchema,
    options: ValidationOptions = {
      stripUnknown: true,
    },
  ): any {
    const validatorResult = schema.validate(obj, options);

    if (validatorResult.error || validatorResult.value === undefined) {
      throw validatorResult.error ?? new Error();
    }

    const { value } = validatorResult;
    if (value === undefined) throw validatorResult.error ?? new Error();

    return validatorResult.value! as any;
  }
}
