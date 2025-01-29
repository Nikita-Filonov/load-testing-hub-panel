import { SettingsView } from '../../Components/Views/SettingsView';
import { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { useIntegrations } from '../../Providers/Integrations/IntegrationsProvider';
import AddIcon from '@mui/icons-material/Add';
import { EmptyView } from '../../Components/Views/EmptyView';
import { SearchTextField } from '../../Components/TextFields/SearchTextField';
import List from '@mui/material/List';
import { Integration } from '../../Models/Integrations/Integrations';
import { IntegrationListItem } from '../../Components/ListItems/Integrations/IntegrationListItem';
import { INITIAL_INTEGRATIONS } from '../../Redux/Integrations/InitialState';
import { CreateIntegrationModal } from '../../Components/Modals/Integrations/CreateIntegrationModal';
import UpdateIntegrationModal from '../../Components/Modals/Integrations/UpdateIntegrationModal';
import { IntegrationDetailsModal } from '../../Components/Modals/Integrations/IntegrationDetailsModal';

type UpdateCompareSettingsViewProps = {
  service: Service;
  integrations: Integration[];
};

const UpdateCompareSettingsWeightsView: FC<UpdateCompareSettingsViewProps> = (props) => {
  const { service, integrations } = props;
  const { loading, getIntegrations } = useIntegrations();
  const [search, setSearch] = useState('');
  const [integration, setIntegration] = useState<Integration>(INITIAL_INTEGRATIONS.integration);
  const [createIntegrationModal, setCreateIntegrationModal] = useState(false);
  const [updateIntegrationModal, setUpdateIntegrationModal] = useState(false);
  const [integrationDetailsModal, setIntegrationDetailsModal] = useState(false);

  useEffect(() => {
    if (service.id) {
      getIntegrations({ serviceId: service.id });
    }
  }, [service.id]);

  const filteredIntegrations = useMemo(
    () => integrations.filter((integration) => integration.name.toLowerCase().includes(search.toLowerCase())),
    [search, integrations]
  );

  const onCreateIntegration = () => setCreateIntegrationModal(true);

  const onUpdateIntegration = (integration: Integration) => {
    setIntegration(integration);
    setUpdateIntegrationModal(true);
  };

  const onIntegrationDetails = (integration: Integration) => {
    setIntegration(integration);
    setIntegrationDetailsModal(true);
  };

  return (
    <SettingsView
      title={'Integrations'}
      loading={loading.getIntegrations}
      actions={[{ icon: <AddIcon />, onClick: onCreateIntegration, disabled: !service.id }]}>
      {integrations.length === 0 && !loading.getIntegrations && (
        <EmptyView
          title={'There is no integrations'}
          description={'To create a integration, click on the plus sign in the upper right corner'}
        />
      )}
      {integrations.length > 0 && !loading.getIntegrations && (
        <SearchTextField sx={{ mb: 2, mt: 0 }} value={search} onChange={setSearch} placeholder={'Search by name'} />
      )}
      <List dense>
        {filteredIntegrations.map((item, index) => (
          <IntegrationListItem
            key={index}
            integration={item}
            onUpdateIntegration={onUpdateIntegration}
            onIntegrationDetails={onIntegrationDetails}
          />
        ))}
      </List>
      <CreateIntegrationModal
        modal={createIntegrationModal}
        setModal={setCreateIntegrationModal}
        serviceId={service.id}
      />
      <UpdateIntegrationModal
        modal={updateIntegrationModal}
        setModal={setUpdateIntegrationModal}
        integrationId={integration.id}
      />
      <IntegrationDetailsModal
        modal={integrationDetailsModal}
        setModal={setIntegrationDetailsModal}
        integrationId={integration.id}
      />
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  integrations: state.integrations.integrations
});
export default connect(getState)(UpdateCompareSettingsWeightsView);
