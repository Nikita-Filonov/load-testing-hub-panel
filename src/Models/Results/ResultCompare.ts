import { BaseCompare } from '../Compares/Compares';

export type ResultCompare = Pick<BaseCompare, 'compare' | 'highlight' | 'explanation'>;
