import { BasePaper } from './BasePaper';
import Typography from '@mui/material/Typography';
import { BoxView } from './BoxView';
import { FC } from 'react';
import { styled } from '@mui/material';

type CodeViewProps = {
  title: string;
  content: string;
};

const Text = styled(Typography)(() => ({
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
  whiteSpace: 'normal'
}));

export const CodeView: FC<CodeViewProps> = ({ title, content }) => {
  return (
    <BoxView title={title} containerSx={{ mt: 0 }}>
      <BasePaper sx={{ mt: 1 }}>
        <Text>{content}</Text>
      </BasePaper>
    </BoxView>
  );
};
