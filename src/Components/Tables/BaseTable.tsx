import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/material';
import { LoadingView } from '../Views/LoadingView';

type BaseTableProps = {
  header: ReactNode;
  loading: boolean;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

export const BaseTable: FC<BaseTableProps> = (props) => {
  const { header, loading, children, containerSx } = props;
  const [tableWidth, setTableWidth] = useState(window.innerWidth / 1.31);

  useEffect(() => {
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onResize = () => {
    setTableWidth(window.innerWidth / 1.3);
  };

  return (
    <TableContainer component={Paper} sx={{ ...containerSx, width: tableWidth }}>
      {loading ? (
        <LoadingView height={300} />
      ) : (
        <Table size={'small'}>
          {header}
          <TableBody>{children}</TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
