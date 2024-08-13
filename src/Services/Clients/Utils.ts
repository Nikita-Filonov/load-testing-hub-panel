export type Query =
  | string
  | string[][]
  | Record<string, string | number | undefined | null | string[] | boolean>
  | URLSearchParams
  | undefined;

export const getQuery = async (object: Query) => {
  if (object !== undefined && object !== null) {
    const isAnyArray = Object.values(object).some((value) => Array.isArray(value));

    if (isAnyArray) {
      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(object)) {
        if (Array.isArray(value)) {
          if (value.length === 0) {
            params.append(key, '0');
          }

          for (const arrayItem of value) {
            params.append(key, arrayItem);
          }
          continue;
        }

        params.append(key, value);
      }
      return '?' + params.toString();
    }
  }

  const queryObject = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(object as Record<string, string>).filter(([_, v]) => v !== null)
  );

  return object ? '?' + new URLSearchParams(queryObject).toString() : '';
};
