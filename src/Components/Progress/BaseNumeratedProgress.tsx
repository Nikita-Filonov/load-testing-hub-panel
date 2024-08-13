import Box from '@mui/material/Box';
import { FC, useMemo } from 'react';
import { styled, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

type ProgressValue = {
  value: number;
  color: string;
  label: string;
};

type ProgressItem = { width: number } & ProgressValue;

type BaseNumeratedProgressProps = {
  values: ProgressValue[];
};

const CONTAINER_WIDTH = 300;
const MIN_ITEM_WIDTH = 35;

const Container = styled(Box)(() => ({
  width: CONTAINER_WIDTH,
  display: 'flex',
  borderRadius: 10,
  overflow: 'hidden',
  height: 20
}));

const ProgressItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'item'
})<{ item: ProgressItem }>(({ item }) => ({
  backgroundColor: item.color,
  width: item.width,
  height: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'filter 0.3s ease-in-out',
  '&:hover': {
    filter: 'brightness(1.2)'
  },
  '&:first-of-type': { borderTopLeftRadius: 2, borderBottomLeftRadius: 2 },
  '&:last-of-type': { borderTopRightRadius: 2, borderBottomRightRadius: 2 }
}));

export const BaseNumeratedProgress: FC<BaseNumeratedProgressProps> = ({ values }) => {
  const items: ProgressItem[] = useMemo(() => {
    const totalValue = values.reduce((sum, pv) => sum + pv.value, 0);
    const filteredValues = values.filter((pv) => pv.value > 0);

    const remainingWidth = CONTAINER_WIDTH - filteredValues.length * MIN_ITEM_WIDTH;

    return filteredValues.map<ProgressItem>((pv) => ({
      ...pv,
      width: MIN_ITEM_WIDTH + (pv.value / totalValue) * remainingWidth
    }));
  }, [values]);

  return (
    <Container>
      {items.map((item, index) => (
        <Tooltip key={index} title={item.label} arrow placement={'top'}>
          <ProgressItem item={item}>
            <Typography color={'white'} variant={'caption'}>
              {item.value}
            </Typography>
          </ProgressItem>
        </Tooltip>
      ))}
    </Container>
  );
};
