import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { FC, ReactNode } from 'react';

type Cell = {
  value: ReactNode;
};

type BaseTableRowProps = {
  cells: Cell[];
};

export const BaseTableRow: FC<BaseTableRowProps> = ({ cells }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {cells.map((cell, index) => (
        <TableCell key={index} align="left">
          {cell.value}
        </TableCell>
      ))}
    </TableRow>
  );
};
