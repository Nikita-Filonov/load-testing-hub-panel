import { styled, Tooltip as MUITooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { FC, ReactElement, ReactNode } from 'react';

type BaseTooltipProps = {
  open?: boolean;
  title: ReactNode;
  setOpen?: (open: boolean) => void;
  children: ReactElement;
};

const Tooltip = styled(({ className, children, ...props }: TooltipProps) => (
  <MUITooltip {...props} classes={{ popper: className }}>
    {children}
  </MUITooltip>
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

export const BaseTooltip: FC<BaseTooltipProps> = (props) => {
  const { open, title, setOpen, children } = props;

  const onClose = () => setOpen && setOpen(false);

  return (
    <Tooltip open={open} title={title} arrow onClose={onClose}>
      <span>{children}</span>
    </Tooltip>
  );
};
