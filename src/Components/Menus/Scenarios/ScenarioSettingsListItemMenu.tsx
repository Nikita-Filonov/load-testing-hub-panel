import { FC, Fragment, useState } from 'react';
import { BaseMenu } from '../BaseMenu';
import { BaseMenuItem } from '../BaseMenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Scenario } from '../../../Models/Services/Scenarios';
import { ViewDetailsMenuItem } from '../../MenuItems/ViewDetailsMenuItem';
import { EditMenuItem } from '../../MenuItems/EditMenuItem';
import { CopyIDMenuItem } from '../../MenuItems/CopyIDMenuItem';
import { DeleteMenuItem } from '../../MenuItems/DeleteMenuItem';
import { DeleteScenarioModal } from '../../Modals/Scenarios/DeleteScenarioModal';

type ScenarioSettingsListItemMenuProps = {
  scenario: Scenario;
  onUpdateScenario: (scenario: Scenario) => void;
  onScenarioDetails: (scenario: Scenario) => void;
  onScenarioSettings: (scenario: Scenario) => void;
};

export const ScenarioSettingsListItemMenu: FC<ScenarioSettingsListItemMenuProps> = (props) => {
  const { scenario, onUpdateScenario, onScenarioDetails, onScenarioSettings } = props;
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const [deleteScenarioModal, setDeleteScenarioModal] = useState(false);

  const onClose = () => setMenu(null);

  const onDetails = () => {
    onClose();
    onScenarioDetails(scenario);
  };

  const onEdit = () => {
    onClose();
    onUpdateScenario(scenario);
  };

  const onDelete = () => {
    onClose();
    setDeleteScenarioModal(true);
  };

  const onSettings = () => {
    onClose();
    onScenarioSettings(scenario);
  };

  const onCopy = async () => {
    onClose();
    await navigator.clipboard.writeText(`${scenario.id}`);
  };

  return (
    <Fragment>
      <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon />}>
        <ViewDetailsMenuItem onDetails={onDetails} />
        <CopyIDMenuItem onCopy={onCopy} />
        <BaseMenuItem icon={<SettingsOutlinedIcon />} label={'Settings'} onClick={onSettings} />
        <EditMenuItem onEdit={onEdit} />
        <DeleteMenuItem onDelete={onDelete} />
      </BaseMenu>
      <DeleteScenarioModal modal={deleteScenarioModal} setModal={setDeleteScenarioModal} scenarioId={scenario.id} />
    </Fragment>
  );
};
