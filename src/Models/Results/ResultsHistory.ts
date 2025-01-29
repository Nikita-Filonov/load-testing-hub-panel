import { Metrics } from '../Metrics/Base';
import { ContentLength } from '../Metrics/ContentLength';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';
import { Datetime } from '../Datetime';

export interface ResultsHistory extends Datetime, Metrics, ContentLength, NumberOfUsers {}

export interface GetResultsHistoryResponse {
  results: ResultsHistory[];
}
