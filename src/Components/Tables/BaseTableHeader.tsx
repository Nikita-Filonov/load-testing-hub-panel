import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import * as React from 'react';
import { FC, ReactNode } from 'react';

type Cell = {
  value?: ReactNode;
};

type BaseTableHeaderProps = {
  cells: Cell[];
};

export const BaseTableHeader: FC<BaseTableHeaderProps> = ({ cells }) => {
  return (
    <TableHead>
      <TableRow>
        {cells.map((cell, index) => (
          <TableCell key={index} align="left" sx={{ whiteSpace: 'nowrap', pt: 2, pb: 2 }}>
            {cell.value}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
