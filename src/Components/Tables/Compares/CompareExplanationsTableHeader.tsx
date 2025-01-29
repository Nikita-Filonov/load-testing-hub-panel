import { BaseTableHeader } from '../BaseTableHeader';

export const CompareExplanationsTableHeader = () => {
  return (
    <BaseTableHeader
      cells={[
        { sx: { pl: 0, pt: 1, pb: 1, color: 'white' }, value: 'Metric' },
        { sx: { pt: 1, pb: 1, color: 'white' }, value: 'Compare' },
        { sx: { pt: 1, pb: 1, color: 'white' }, value: 'Weight' }
      ]}
      rowSx={{ borderBottom: `2px solid white` }}
    />
  );
};
