import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ViewDetailsMenuItem } from '../../MenuItems/ViewDetailsMenuItem';
import { BaseMenu } from '../BaseMenu';
import { FC, useState } from 'react';
import { CopyDetailsURLMenuItem } from '../../MenuItems/CopyDetailsURLMenuItem';
import { useMethodsNavigation } from '../../../Services/Methods/Hooks';
import { ProtocolType } from '../../../Models/Results/MethodResults';

type MethodViewMenuItemProps = {
  method: string;
  protocol: ProtocolType;
};

export const MethodViewMenuItem: FC<MethodViewMenuItemProps> = ({ method, protocol }) => {
  const { getMethodURL, navigateMethodDetails } = useMethodsNavigation();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onViewDetails = () => {
    onClose();
    navigateMethodDetails({ method, protocol });
  };

  const onCopyDetailsURL = async () => {
    onClose();
    await navigator.clipboard.writeText(getMethodURL({ method, protocol }));
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon fontSize={'small'} />} buttonSize={'small'}>
      <ViewDetailsMenuItem onDetails={onViewDetails} />
      <CopyDetailsURLMenuItem onCopy={onCopyDetailsURL} />
    </BaseMenu>
  );
};
