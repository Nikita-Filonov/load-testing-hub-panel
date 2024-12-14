import { FC } from 'react';
import { MethodResultCompare } from '../../Models/Compares/Compares';
import { WidgetView } from '../../Components/Views/WidgetView';
import { MethodResultsCompareTable } from '../../Components/Tables/Compares/MethodResultsCompareTable';
import { CompareViewSettingsMenu } from '../../Components/Menus/Compares/CompareViewSettingsMenu';
import { CompareTableSettings, CompareWidgetType } from '../../Models/Compares/CompareTableSettings';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { setCompareWidgetSettings } from '../../Redux/Compares/CompareSettings/CompareSettingsSlice';

type MethodResultCompareViewProps = {
  compares: MethodResultCompare[];
  widgetType: CompareWidgetType;
};

export const MethodResultsCompareView: FC<MethodResultCompareViewProps> = (props) => {
  const { compares, widgetType } = props;
  const dispatch = useDispatch();

  const settings = useSelector((state: ReduxState) => state.compareSettings.compareWidgetsSettings[widgetType]);

  const onSetTableSettings = (methodResultsCompareTable: CompareTableSettings<MethodResultCompare>) => {
    dispatch(setCompareWidgetSettings({ type: widgetType, settings: { ...settings, methodResultsCompareTable } }));
  };

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={'Comparison of method values'}
      actions={[
        {
          content: (
            <CompareViewSettingsMenu
              tableSettings={settings.methodResultsCompareTable}
              setTableSettings={onSetTableSettings}
            />
          )
        }
      ]}
      allowClose>
      <MethodResultsCompareTable compares={compares} settings={settings.methodResultsCompareTable} />
    </WidgetView>
  );
};
