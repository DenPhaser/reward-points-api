import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'AtLeastOneIsNotEmpty', async: false })
export class AtLeastOneIsNotEmptyConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const properties = args.constraints[0] as string[];
    console.log(value)
    console.log(args)

    return properties.some(property => {
      const propertyValue = args.object[property]

      return !!propertyValue
    })
  }

  defaultMessage(args: ValidationArguments) {
    return 'At least one of the specified fields must be non-empty.';
  }
}

export function AtLeastOneIsNotEmpty(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Function) {
    registerDecorator({
      propertyName: properties.join(','),
      target: object,
      options: validationOptions,
      constraints: [properties],
      validator: AtLeastOneIsNotEmptyConstraint,
    });
  };
}
