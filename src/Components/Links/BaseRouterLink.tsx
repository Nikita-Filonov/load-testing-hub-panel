import { Link as RouterLink, To } from 'react-router-dom';
import { Link } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import { SettingsManager } from '../../Services/Config';

type BaseRouterLinkProps = {
  to: To;
  copyURL?: string;
  allowCopy?: boolean;
} & PropsWithChildren;

export const BaseRouterLink: FC<BaseRouterLinkProps> = (props) => {
  const { to, copyURL, allowCopy, children } = props;

  const onCopy = async () => await navigator.clipboard.writeText(copyURL ? copyURL : `${SettingsManager.appUrl}${to}`);

  return allowCopy ? (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Link component={RouterLink} to={to} underline="hover">
        {children}
      </Link>
      <IconButton sx={{ ml: 0.5 }} size={'small'} onClick={onCopy}>
        <LinkIcon fontSize={'small'} />
      </IconButton>
    </Box>
  ) : (
    <Link component={RouterLink} to={to} underline="hover">
      {children}
    </Link>
  );
};
