import { ExceptionResult, ExceptionResultDetails } from '../../../Models/Results/ExceptionResults';

export type ExceptionResultsInitialState = {
  exceptionResults: ExceptionResult[];
  exceptionResultDetails: ExceptionResultDetails;
};

export const INITIAL_EXCEPTION_RESULTS: ExceptionResultsInitialState = {
  exceptionResults: [],
  exceptionResultDetails: {
    id: 0,
    message: '',
    details: '',
    numberOfExceptions: 0
  }
};
