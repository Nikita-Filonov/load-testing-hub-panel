import qs from 'qs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryString = (query: any): string => {
  return qs.stringify(query, {
    skipNulls: true,
    arrayFormat: 'repeat',
    addQueryPrefix: true
  });
};
