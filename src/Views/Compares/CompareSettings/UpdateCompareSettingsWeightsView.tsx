import { SettingsView } from '../../../Components/Views/SettingsView';
import { FC, useEffect, useMemo, useState } from 'react';
import { CompareSettingsWeights } from '../../../Models/Compares/CompareSettings';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { useCompareSettings } from '../../../Providers/Compares/CompareSettingsProvider';
import { Service } from '../../../Models/Services/Services';
import CheckIcon from '@mui/icons-material/Check';
import { sumCompareSettingsWeights } from '../../../Services/Compares/Utils';
import { UpdateCompareSettingsWeightsForm } from '../../../Components/Forms/Compares/UpdateCompareSettingsWeightsForm';

type UpdateCompareSettingsViewProps = {
  service: Service;
  weightsStore: CompareSettingsWeights;
};

const UpdateCompareSettingsWeightsView: FC<UpdateCompareSettingsViewProps> = (props) => {
  const { service, weightsStore } = props;
  const { loading, getCompareSettings, updateCompareSettings } = useCompareSettings();
  const [weights, setWeights] = useState<CompareSettingsWeights>(weightsStore);

  useEffect(() => {
    setWeights(weightsStore);
  }, [weightsStore]);

  useEffect(() => {
    service.id && getCompareSettings(service.id);
  }, [service.id]);

  const allowUpdate = useMemo(() => sumCompareSettingsWeights(weights) === 1, [weights]);

  const onUpdateSettings = async () => await updateCompareSettings(service.id, { weights });

  return (
    <SettingsView
      title={`Compare weights for ${service.name}`}
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
      <UpdateCompareSettingsWeightsForm weights={weights} setWeights={setWeights} />
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  weightsStore: state.compareSettings.compareSettings.weights
});
export default connect(getState)(UpdateCompareSettingsWeightsView);
