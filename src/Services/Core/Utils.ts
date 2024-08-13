export const countNotNullValues = (input: Record<string, string | number | null>): number =>
  Object.values(input).filter(Boolean).length;
