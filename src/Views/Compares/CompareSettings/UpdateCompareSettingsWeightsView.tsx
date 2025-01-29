import { SettingsView } from '../../../Components/Views/SettingsView';
import { FC, useEffect, useState } from 'react';
import { CompareSettingsWeights } from '../../../Models/Compares/CompareSettings';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareSettingsErrorKey, useCompareSettings } from '../../../Providers/Compares/CompareSettingsProvider';
import { Service } from '../../../Models/Services/Services';
import CheckIcon from '@mui/icons-material/Check';
import { UpdateCompareSettingsWeightsForm } from '../../../Components/Forms/Compares/UpdateCompareSettingsWeightsForm';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type UpdateCompareSettingsViewProps = {
  service: Service;
  weightsStore: CompareSettingsWeights;
};

const UpdateCompareSettingsWeightsView: FC<UpdateCompareSettingsViewProps> = (props) => {
  const { service, weightsStore } = props;
  const { loading, getCompareSettings, updateCompareSettings } = useCompareSettings();
  const { validationErrors, clearValidationErrors } = useValidationErrors({
    key: CompareSettingsErrorKey.UpdateCompareSettings
  });
  const [weights, setWeights] = useState<CompareSettingsWeights>(weightsStore);

  useEffect(() => {
    setWeights(weightsStore);
  }, [weightsStore]);

  useEffect(() => {
    if (service.id) {
      getCompareSettings(service.id);
    }

    return () => {
      clearValidationErrors();
    };
  }, [service.id]);

  const onUpdateSettings = async () => {
    const result = await updateCompareSettings(service.id, { weights });
    if (!result.error) {
      clearValidationErrors();
    }
  };

  return (
    <SettingsView
      title={`Compare weights for ${service.name}`}
      alert={'Sum of metrics weight must not be more than 1'}
      actions={[{ icon: <CheckIcon />, loading: loading.updateCompareSettings, onClick: onUpdateSettings }]}
      loading={loading.getCompareSettings}
      validationErrors={validationErrors}>
      <UpdateCompareSettingsWeightsForm weights={weights} setWeights={setWeights} />
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  weightsStore: state.compareSettings.compareSettings.weights
});
export default connect(getState)(UpdateCompareSettingsWeightsView);
