export function mergeWithoutUndefined<T extends { [key: string]: any }>(
  base: T,
  ...overrides: Array<Partial<T>>
): T {
  const result = Object.assign({}, base);
  for (const override of overrides) {
    for (const [key, value] of Object.entries(override)) {
      if (value != null) {
        result[key] = value;
      }
    }
  }
  return result;
}
