import { FC } from 'react';
import { MethodResultCompare } from '../../Models/Compares/Compares';
import { WidgetView } from '../../Components/Views/WidgetView';
import { MethodResultCompareTable } from '../../Components/Tables/Compares/MethodResultCompareTable';
import { CompareLabel } from '../../Components/Labels/Compares/CompareLabel';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { CompareTableSettings, CompareWidgetType } from '../../Models/Compares/CompareTableSettings';
import { setCompareWidgetSettings } from '../../Redux/Compares/CompareSettings/CompareSettingsSlice';
import { CompareViewSettingsMenu } from '../../Components/Menus/Compares/CompareViewSettingsMenu';

type MethodResultCompareViewProps = {
  title: string;
  loading: boolean;
  compare: MethodResultCompare;
  widgetType: CompareWidgetType;
};

export const MethodResultCompareView: FC<MethodResultCompareViewProps> = (props) => {
  const { title, loading, compare, widgetType } = props;
  const dispatch = useDispatch();

  const settings = useSelector((state: ReduxState) => state.compareSettings.compareWidgetsSettings[widgetType]);

  const onSetTableSettings = (methodResultCompareTable: CompareTableSettings<MethodResultCompare>) => {
    dispatch(setCompareWidgetSettings({ type: widgetType, settings: { ...settings, methodResultCompareTable } }));
  };

  return (
    <WidgetView
      sx={{ mt: 3 }}
      label={<CompareLabel compare={compare.compare} />}
      title={title}
      loading={loading}
      actions={[
        {
          content: (
            <CompareViewSettingsMenu
              tableSettings={settings.methodResultCompareTable}
              setTableSettings={onSetTableSettings}
            />
          )
        }
      ]}>
      <MethodResultCompareTable compare={compare} settings={settings.methodResultCompareTable} />
    </WidgetView>
  );
};
