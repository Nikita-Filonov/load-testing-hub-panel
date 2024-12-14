import { SettingsView } from '../../Components/Views/SettingsView';
import { FC, useEffect, useMemo, useState } from 'react';
import { CompareSettings, UpdateCompareSettingsRequest } from '../../Models/Compares/CompareSettings';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { useCompareSettings } from '../../Providers/Compares/CompareSettingsProvider';
import { Service } from '../../Models/Services/Services';
import { UpdateCompareSettingsForm } from '../../Components/Forms/Compares/UpdateCompareSettingsForm';
import CheckIcon from '@mui/icons-material/Check';
import { sumCompareSettingsMetrics } from '../../Services/Compares/Utils';

type UpdateCompareSettingsViewProps = {
  service: Service;
  settingsStore: CompareSettings;
};

const UpdateCompareSettingsView: FC<UpdateCompareSettingsViewProps> = (props) => {
  const { service, settingsStore } = props;
  const { loading, getCompareSettings, updateCompareSettings } = useCompareSettings();
  const [request, setRequest] = useState<UpdateCompareSettingsRequest>(settingsStore);

  useEffect(() => {
    setRequest(settingsStore);
  }, [settingsStore]);

  useEffect(() => {
    service.id && getCompareSettings(service.id);
  }, [service.id]);

  const allowUpdate = useMemo(() => sumCompareSettingsMetrics(request) === 1, [request]);

  const onUpdateSettings = async () => await updateCompareSettings(service.id, request);

  return (
    <SettingsView
      title={`Compare settings for ${service.name}`}
      alert={'Sum of metrics weight must not be more than 1'}
      actions={[
        {
          icon: <CheckIcon />,
          loading: loading.updateCompareSettings,
          onClick: onUpdateSettings,
          disabled: !allowUpdate
        }
      ]}
      loading={loading.getCompareSettings}>
      <UpdateCompareSettingsForm request={request} setRequest={setRequest} />
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  settingsStore: state.compareSettings.compareSettings
});
export default connect(getState)(UpdateCompareSettingsView);
