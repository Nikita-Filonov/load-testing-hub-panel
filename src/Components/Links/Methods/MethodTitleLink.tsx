import { BaseRouterLink } from '../BaseRouterLink';
import { FC } from 'react';
import { useMethodsNavigation } from '../../../Services/Methods/Hooks';
import { ProtocolType } from '../../../Models/Results/MethodResults';

type MethodTitleLinkProps = {
  method: string;
  protocol: ProtocolType;
};

export const MethodTitleLink: FC<MethodTitleLinkProps> = ({ method, protocol }) => {
  const { getMethodURL, getMethodRoute } = useMethodsNavigation();

  return (
    <BaseRouterLink to={getMethodRoute({ method, protocol })} copyURL={getMethodURL({ method, protocol })} allowCopy>
      {method}
    </BaseRouterLink>
  );
};
