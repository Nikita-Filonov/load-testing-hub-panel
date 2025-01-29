import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { BoxView } from '../../Components/Views/BoxView';
import { Integration } from '../../Models/Integrations/Integrations';
import { useIntegrations } from '../../Providers/Integrations/IntegrationsProvider';
import { IntegrationEnvironmentTypeLabel } from '../../Components/Labels/Integrations/IntegrationEnvironmentTypeLabel';
import { IntegrationSystemTypeLabel } from '../../Components/Labels/Integrations/IntegrationSystemTypeLabel';

type IntegrationViewProps = {
  integration: Integration;
  integrationId: number;
};

const IntegrationView: FC<IntegrationViewProps> = ({ integration, integrationId }) => {
  const { loading, getIntegration } = useIntegrations();

  useEffect(() => {
    if (integrationId) {
      getIntegration(integrationId);
    }
  }, [integrationId]);

  return (
    <BoxView loading={loading.getIntegration} containerSx={{ mt: 0 }}>
      <WidgetInfoRowsView containerSx={{ mt: 0 }}>
        <BaseInfoRowView name={'ID'} value={integration.id} />
        <BaseInfoRowView name={'Name'} value={integration.name} />
        <BaseInfoRowView name={'Order index'} value={integration.orderIndex} />
        <BaseInfoRowView name={'System type'} component={<IntegrationSystemTypeLabel integration={integration} />} />
        <BaseInfoRowView
          name={'Environment type'}
          component={<IntegrationEnvironmentTypeLabel integration={integration} />}
        />
        <BaseInfoRowView name={'URL template'} value={integration.urlTemplate} />
      </WidgetInfoRowsView>
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({ integration: state.integrations.integration });
export default connect(getState)(IntegrationView);
