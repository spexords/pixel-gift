import { SelectOption } from 'src/app/core/models';

export function enumToArray<T extends object>(enumObject: T): string[] {
  return Object.values(enumObject).filter(
    (value) => typeof value === 'string'
  ) as string[];
}

export function enumToSelectOptions<T extends object>(
  enumObject: T
): SelectOption<string>[] {
  return Object.values(enumObject)
    .filter((value) => typeof value === 'string')
    .map((value) => ({ value: value, displayValue: value }));
}
