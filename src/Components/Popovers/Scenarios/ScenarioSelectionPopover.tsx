import { Fragment, MouseEvent, useState } from 'react';
import ScenarioSelectionLabel from '../../Labels/Scenarios/ScenarioSelectionLabel';
import { BasePopover } from '../BasePopover';
import ScenarioSelectionListView from '../../../Views/Scenarios/ScenarioSelectionListView';
import { ScenariosProvider } from '../../../Providers/Services/ScenariosProvider';

export const ScenarioSelectionPopover = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const onOpen = (event: MouseEvent<HTMLDivElement>) => setAnchor(event.currentTarget);

  const onClose = () => setAnchor(null);

  return (
    <Fragment>
      <ScenarioSelectionLabel onSelectScenario={onOpen} />
      <BasePopover anchor={anchor} setAnchor={setAnchor}>
        <ScenariosProvider>
          <ScenarioSelectionListView onSelectScenarioCallback={onClose} />
        </ScenariosProvider>
      </BasePopover>
    </Fragment>
  );
};
