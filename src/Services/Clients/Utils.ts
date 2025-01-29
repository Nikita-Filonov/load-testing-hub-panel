import qs from 'qs';
import { ValidationError } from './Models';

type GetValidationErrorProps = {
  location: string;
  validationErrors: ValidationError[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryString = (query: any): string => {
  return qs.stringify(query, {
    skipNulls: true,
    arrayFormat: 'repeat',
    addQueryPrefix: true
  });
};

export const getValidationError = ({ location, validationErrors }: GetValidationErrorProps): ValidationError | null => {
  if (!validationErrors) return null;

  return validationErrors.find((error) => error.loc.join('.') === location) || null;
};
