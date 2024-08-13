import { BaseChartView, BaseChartViewProps } from './BaseChartView';
import { FC } from 'react';

type BaseGaugeChartViewProps = Pick<BaseChartViewProps, 'title' | 'loading' | 'children'>;

export const BaseGaugeChartView: FC<BaseGaugeChartViewProps> = (props) => {
  const { title, loading, children } = props;

  return (
    <BaseChartView
      title={title}
      loading={loading}
      childrenSx={{ display: 'flex', justifyContent: 'center' }}
      containerSx={{ height: 250 }}>
      {children}
    </BaseChartView>
  );
};
