import { BaseRouterLink } from '../BaseRouterLink';
import { FC } from 'react';
import { useMethodsNavigation } from '../../../Services/Methods/Hooks';

type MethodTitleLinkProps = {
  method: string;
};

export const MethodTitleLink: FC<MethodTitleLinkProps> = ({ method }) => {
  const { getMethodURL, getMethodRoute } = useMethodsNavigation();

  return (
    <BaseRouterLink to={getMethodRoute(method)} copyURL={getMethodURL(method)} allowCopy>
      {method}
    </BaseRouterLink>
  );
};
