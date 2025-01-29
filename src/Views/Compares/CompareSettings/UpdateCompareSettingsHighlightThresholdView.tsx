import { SettingsView } from '../../../Components/Views/SettingsView';
import { FC, useEffect, useState } from 'react';
import { CompareSettingsHighlightThreshold } from '../../../Models/Compares/CompareSettings';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareSettingsErrorKey, useCompareSettings } from '../../../Providers/Compares/CompareSettingsProvider';
import { Service } from '../../../Models/Services/Services';
import CheckIcon from '@mui/icons-material/Check';
import { UpdateCompareSettingsHighlightThresholdForm } from '../../../Components/Forms/Compares/UpdateCompareSettingsHighlightThresholdForm';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type UpdateCompareSettingsHighlightThresholdViewProps = {
  service: Service;
  highlightThresholdStore: CompareSettingsHighlightThreshold;
};

const UpdateCompareSettingsHighlightThresholdView: FC<UpdateCompareSettingsHighlightThresholdViewProps> = (props) => {
  const { service, highlightThresholdStore } = props;
  const { loading, getCompareSettings, updateCompareSettings } = useCompareSettings();
  const { validationErrors, clearValidationErrors } = useValidationErrors({
    key: CompareSettingsErrorKey.UpdateCompareSettings
  });
  const [highlightThreshold, setHighlightThreshold] =
    useState<CompareSettingsHighlightThreshold>(highlightThresholdStore);

  useEffect(() => {
    setHighlightThreshold(highlightThresholdStore);
  }, [highlightThresholdStore]);

  useEffect(() => {
    if (service.id) {
      getCompareSettings(service.id);
    }

    return () => {
      clearValidationErrors();
    };
  }, [service.id]);

  const onUpdateSettings = async () => {
    const result = await updateCompareSettings(service.id, { highlightThreshold });
    if (!result.error) {
      clearValidationErrors();
    }
  };

  return (
    <SettingsView
      alert={
        'On this page, you can configure the percentage thresholds for highlighting results when they exceed the defined limits'
      }
      title={`Compare highlight threshold for ${service.name}`}
      actions={[{ icon: <CheckIcon />, loading: loading.updateCompareSettings, onClick: onUpdateSettings }]}
      loading={loading.getCompareSettings}
      validationErrors={validationErrors}>
      <UpdateCompareSettingsHighlightThresholdForm
        highlightThreshold={highlightThreshold}
        setHighlightThreshold={setHighlightThreshold}
      />
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  highlightThresholdStore: state.compareSettings.compareSettings.highlightThreshold
});
export default connect(getState)(UpdateCompareSettingsHighlightThresholdView);
