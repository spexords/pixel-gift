export function enumToArray<T extends object>(enumObject: T): string[] {
  return Object.values(enumObject)
    .filter(value => typeof value === 'string') as string[];
}