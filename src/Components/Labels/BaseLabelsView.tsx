import { Children, FC, PropsWithChildren } from 'react';
import { styled, SxProps, Theme } from '@mui/material';

export type BaseLabelsViewProps = {
  listItemSx?: (index: number) => SxProps<Theme>;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

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
  const { children, listItemSx, containerSx } = props;

  return (
    <Container sx={containerSx}>
      {Children.toArray(children).map((label, index) => (
        <ListItem key={index} sx={listItemSx?.(index)}>
          {label}
        </ListItem>
      ))}
    </Container>
  );
};
