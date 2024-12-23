import { LoadTestResultCompare } from '../../Models/Compares/Compares';
import { FC } from 'react';
import { WidgetView } from '../../Components/Views/WidgetView';
import { CompareLabel } from '../../Components/Labels/Compares/CompareLabel';
import { LoadTestResultCompareTable } from '../../Components/Tables/Compares/LoadTestResultCompareTable';
import { CompareViewSettingsMenu } from '../../Components/Menus/Compares/CompareViewSettingsMenu';
import { CompareTableSettings, CompareWidgetType } from '../../Models/Compares/CompareTableSettings';
import { useDispatch, useSelector } from 'react-redux';
import { setCompareWidgetSettings } from '../../Redux/Compares/CompareSettings/CompareSettingsSlice';
import { ReduxState } from '../../Redux/ReduxState';

type BaseCompareViewProps = {
  title?: string;
  compare: LoadTestResultCompare;
  loading?: boolean;
  widgetType: CompareWidgetType;
};

export const LoadTestResultCompareView: FC<BaseCompareViewProps> = (props) => {
  const { title, compare, loading, widgetType } = props;
  const dispatch = useDispatch();

  const settings = useSelector((state: ReduxState) => state.compareSettings.compareWidgetsSettings[widgetType]);

  const onSetTableSettings = (loadTestResultCompareTable: CompareTableSettings<LoadTestResultCompare>) => {
    dispatch(setCompareWidgetSettings({ type: widgetType, settings: { ...settings, loadTestResultCompareTable } }));
  };

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={title || 'Comparison of average values'}
      label={<CompareLabel compare={compare} />}
      loading={loading}
      actions={[
        {
          content: (
            <CompareViewSettingsMenu
              tableSettings={settings.loadTestResultCompareTable}
              setTableSettings={onSetTableSettings}
            />
          )
        }
      ]}
      allowClose>
      <LoadTestResultCompareTable compare={compare} settings={settings.loadTestResultCompareTable} />
    </WidgetView>
  );
};
