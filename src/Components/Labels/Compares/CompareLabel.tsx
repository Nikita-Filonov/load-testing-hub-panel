import { SxProps, Theme } from '@mui/material';
import { FC, useState } from 'react';
import { BaseLabel } from '../BaseLabel';
import { getCompareColor, getCompareTitle } from '../../../Services/Compare/Utils';
import { BaseCompare } from '../../../Models/Compares/Compares';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CompareExplanationTooltipView } from '../../Tooltips/Compares/CompareExplainTooltipView';
import { BaseTooltip } from '../../Tooltips/BaseTooltip';

type CompareLabelProps = {
  sx?: SxProps<Theme>;
  compare: BaseCompare;
};

export const CompareLabel: FC<CompareLabelProps> = ({ sx, compare }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  return (
    <BaseTooltip open={open} title={<CompareExplanationTooltipView summary={compare.explanation} />} setOpen={setOpen}>
      <BaseLabel
        sx={sx}
        icon={compare.highlight ? <ErrorOutlineIcon fontSize={'small'} /> : undefined}
        color={compare.highlight ? 'error' : getCompareColor(compare.compare)}
        label={getCompareTitle({ percent: compare.compare, context: 'comparable' })}
        onClick={onOpen}
      />
    </BaseTooltip>
  );
};
