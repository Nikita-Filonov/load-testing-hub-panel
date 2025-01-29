import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { FC, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export type TableRowCell = {
  sx?: SxProps<Theme>;
  value: ReactNode;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  hidden?: boolean;
  rowSpan?: number;
};

type BaseTableRowProps = {
  sx?: SxProps<Theme>;
  cells: TableRowCell[];
  hover?: boolean;
};

export const BaseTableRow: FC<BaseTableRowProps> = ({ sx, cells, hover }) => {
  return (
    <TableRow sx={sx} hover={hover}>
      {cells.map((cell, index) =>
        cell.hidden ? null : (
          <TableCell key={index} sx={cell.sx} align={cell.align || 'left'} rowSpan={cell.rowSpan}>
            {cell.value}
          </TableCell>
        )
      )}
    </TableRow>
  );
};
