import { BaseTooltipView } from '../BaseTooltipView';
import { CompareExplanationSummary } from '../../../Models/Compares/CompareExplanation';
import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { CompareExplanationsTable } from '../../Tables/Compares/CompareExplanationsTable';

type CompareExplanationTooltipViewProps = {
  summary?: CompareExplanationSummary;
};

export const CompareExplanationTooltipView: FC<CompareExplanationTooltipViewProps> = ({ summary }) => {
  if (!summary) return null;

  return (
    <BaseTooltipView title={'Explanation'}>
      <CompareExplanationsTable explanations={summary.explanations} />
      <Typography sx={{ mt: 3 }}>
        <b>Formula</b>: <i>{summary.formula}</i>
      </Typography>
    </BaseTooltipView>
  );
};
