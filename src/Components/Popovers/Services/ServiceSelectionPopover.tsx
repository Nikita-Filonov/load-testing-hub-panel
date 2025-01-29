import { Fragment, MouseEvent, useState } from 'react';
import ServiceSelectionLabel from '../../Labels/Services/ServiceSelectionLabel';
import ServiceSelectionListView from '../../../Views/Services/ServiceSelectionListView';
import { BasePopover } from '../BasePopover';

export const ServiceSelectionPopover = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const onOpen = (event: MouseEvent<HTMLDivElement>) => setAnchor(event.currentTarget);

  const onClose = () => setAnchor(null);

  return (
    <Fragment>
      <ServiceSelectionLabel onSelectService={onOpen} />
      <BasePopover anchor={anchor} setAnchor={setAnchor}>
        <ServiceSelectionListView onSelectServiceCallback={onClose} />
      </BasePopover>
    </Fragment>
  );
};
