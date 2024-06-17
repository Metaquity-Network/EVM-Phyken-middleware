import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsGreaterThanConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _args: ValidationArguments) {
    const numberValue = parseFloat(value);
    return !isNaN(numberValue) && numberValue >= 100;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Investment amount must be greater than 100';
  }
}

export function IsGreaterThan(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGreaterThanConstraint,
    });
  };
}
