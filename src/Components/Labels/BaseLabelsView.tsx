import { FC } from 'react';
import { BaseLabel, BaseLabelProps } from './BaseLabel';
import { styled, SxProps, Theme } from '@mui/material';

export type BaseLabelsViewProps = {
  labels: BaseLabelProps[];
  listItemSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
};

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

const Container = styled('ul')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 0.5,
  margin: 0,
  marginLeft: 5
}));

export const BaseLabelsView: FC<BaseLabelsViewProps> = (props) => {
  const { labels, listItemSx, containerSx } = props;

  return (
    <Container sx={containerSx}>
      {labels.map((label, index) => (
        <ListItem key={index} sx={listItemSx}>
          <BaseLabel {...label} />
        </ListItem>
      ))}
    </Container>
  );
};
