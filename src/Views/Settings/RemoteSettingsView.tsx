import { WidgetView } from '../../Components/Views/WidgetView';
import ScenarioSelectionListView from '../Scenarios/ScenarioSelectionListView';

export const RemoteSettingsView = () => {
  return (
    <WidgetView flat sx={{ mt: 3 }} title={'Remote settings'}>
      <ScenarioSelectionListView />
    </WidgetView>
  );
};
