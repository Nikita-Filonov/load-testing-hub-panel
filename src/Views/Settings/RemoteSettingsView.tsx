import { WidgetView } from '../../Components/Views/WidgetView';
import ServicesSettingsListView from '../Services/ServicesSettingsListView';
import ScenariosSettingsListView from '../Scenarios/ScenariosSettingsListView';

export const RemoteSettingsView = () => {
  return (
    <WidgetView flat sx={{ mt: 3 }} title={'Remote settings'}>
      <ServicesSettingsListView />
      <ScenariosSettingsListView />
    </WidgetView>
  );
};
