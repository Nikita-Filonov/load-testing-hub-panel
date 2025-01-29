import { ExceptionResult } from '../Results/ExceptionResults';
import { MethodResult } from '../Results/MethodResults';

export enum TableType {
  ExceptionResultsTable = 'EXCEPTION_RESULTS_TABLE',
  MethodResultsStatisticsTable = 'METHOD_RESULTS_STATISTICS_TABLE',
  MethodResultsPercentilesTable = 'METHOD_RESULTS_PERCENTILES_TABLE'
}

export interface RowSettings<Data> {
  value: keyof Data;
  index: number;
  hidden: boolean;
}

export type HeaderSettings = {
  index: number;
  value: string;
  hidden: boolean;
  orderKey?: string;
};

export interface TableSettings<Data> {
  rows: RowSettings<Data>[];
  headers: HeaderSettings[];
}

export interface CoreTableSettings {
  [TableType.ExceptionResultsTable]: TableSettings<ExceptionResult>;
  [TableType.MethodResultsStatisticsTable]: TableSettings<MethodResult>;
  [TableType.MethodResultsPercentilesTable]: TableSettings<MethodResult>;
}
