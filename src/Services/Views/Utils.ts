type GetActionMarginRightProps<T> = {
  index: number;
  margin: number;
  actions?: T[];
};

export const getActionMarginRight = <T>({ index, margin, actions }: GetActionMarginRightProps<T>): number => {
  return actions?.length === index + 1 ? 0 : margin;
};
