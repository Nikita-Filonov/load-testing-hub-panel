import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { BoxView } from '../../Components/Views/BoxView';
import { ServiceDetails } from '../../Models/Services/Services';
import { useServices } from '../../Providers/Services/ServicesProvider';

type ServiceDetailsViewProps = {
  details: ServiceDetails;
  serviceId: number;
};

const ServiceDetailsView: FC<ServiceDetailsViewProps> = ({ details, serviceId }) => {
  const { loading, getServiceDetails } = useServices();

  useEffect(() => {
    serviceId && getServiceDetails(serviceId);
  }, [serviceId]);

  return (
    <BoxView loading={loading.getServiceDetails} containerSx={{ mt: 0 }}>
      <WidgetInfoRowsView containerSx={{ mt: 0 }}>
        <BaseInfoRowView name={'ID'} value={details.id} />
        <BaseInfoRowView name={'URL'} value={details.url} />
        <BaseInfoRowView name={'Name'} value={details.name} />
        <BaseInfoRowView name={'Cluster'} value={details.cluster} />
        <BaseInfoRowView name={'Namespace'} value={details.namespace} />
      </WidgetInfoRowsView>
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.services.serviceDetails
});
export default connect(getState)(ServiceDetailsView);
