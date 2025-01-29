import { FC, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ResultCompare } from '../../../Models/Results/ResultCompare';
import { BaseTooltip } from '../../Tooltips/BaseTooltip';
import { BaseLabel } from '../BaseLabel';
import { CompareExplanationTooltipView } from '../../Tooltips/Compares/CompareExplainTooltipView';
import { getCompareColor, getCompareTitle } from '../../../Services/Compare/Utils';

type ResultCompareLabelProps = {
  compare: ResultCompare;
  context: 'average' | 'previous';
};

export const ResultCompareLabel: FC<ResultCompareLabelProps> = (props) => {
  const { compare, context } = props;

  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  return (
    <BaseTooltip open={open} title={<CompareExplanationTooltipView summary={compare.explanation} />} setOpen={setOpen}>
      <BaseLabel
        icon={compare.highlight ? <ErrorOutlineIcon fontSize={'small'} /> : undefined}
        label={getCompareTitle({ percent: compare.compare, context })}
        color={compare.highlight ? 'error' : getCompareColor(compare?.compare)}
        onClick={onOpen}
      />
    </BaseTooltip>
  );
};
