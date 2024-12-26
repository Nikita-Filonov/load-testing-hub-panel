import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { BoxView } from '../../Components/Views/BoxView';
import { Integration } from '../../Models/Integrations/Integrations';
import { useIntegrations } from '../../Providers/Integrations/IntegrationsProvider';
import { IntegrationEnvironmentTypeLabel } from '../../Components/Labels/Integrations/IntegrationEnvironmentTypeLabel';

type IntegrationViewProps = {
  integration: Integration;
  integrationId: number;
};

const IntegrationView: FC<IntegrationViewProps> = ({ integration, integrationId }) => {
  const { loading, getIntegration } = useIntegrations();

  useEffect(() => {
    integrationId && getIntegration(integrationId);
  }, [integrationId]);

  return (
    <BoxView loading={loading.getIntegration} containerSx={{ mt: 0 }}>
      <WidgetInfoRowsView containerSx={{ mt: 0 }}>
        <BaseInfoRowView name={'ID'} value={integration.id} />
        <BaseInfoRowView name={'Name'} value={integration.name} />
        <BaseInfoRowView name={'Cluster'} value={integration.cluster} />
        <BaseInfoRowView name={'Namespace'} value={integration.namespace} />
        <BaseInfoRowView
          name={'Environment type'}
          component={<IntegrationEnvironmentTypeLabel type={integration.environmentType} />}
        />
      </WidgetInfoRowsView>
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({ integration: state.integrations.integration });
export default connect(getState)(IntegrationView);
