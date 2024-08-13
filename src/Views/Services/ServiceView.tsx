import { Service } from '../../Models/Services/Services';
import { FC } from 'react';
import { connect } from 'react-redux';
import { WidgetView } from '../../Components/Views/WidgetView';
import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { ReduxState } from '../../Redux/ReduxState';

type ServiceViewProps = {
  service: Service;
};

const ServiceView: FC<ServiceViewProps> = ({ service }) => {
  return (
    <WidgetView sx={{ mt: 3 }} title={'Service details'}>
      <WidgetInfoRowsView>
        <BaseInfoRowView name={'URL'} value={service.url} />
        <BaseInfoRowView name={'Name'} value={service.name} />
      </WidgetInfoRowsView>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service
});
export default connect(getState)(ServiceView);
