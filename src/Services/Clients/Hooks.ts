import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { clearValidationErrors as storeClearValidationErrors, setValidationErrors } from '../../Redux/Core/Slice';
import { APIResponse } from './Models';
import { useState } from 'react';

type BaseLoading = Record<string, boolean>;

type UseAPIResponseHandlerProps<Loading extends BaseLoading> = {
  provider: string;
  defaultLoading: Loading;
};

type HandleAPIResponseProps<Response, LoadingKeys> = {
  key: keyof LoadingKeys;
  call: Promise<APIResponse<Response>>;
  handler?: (response: Response) => void;
};

export const useAPIResponseHandler = <Loading extends BaseLoading>(props: UseAPIResponseHandlerProps<Loading>) => {
  const { provider, defaultLoading } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<Loading>(defaultLoading);

  const setLoadingOf = (key: keyof Loading, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const handleAPIResponse = async <Response>(
    props: HandleAPIResponseProps<Response, Loading>
  ): Promise<APIResponse<Response>> => {
    const { key, call, handler } = props;

    setLoadingOf(key, true);

    try {
      const result = await call;

      if (result.response && handler) {
        handler(result.response);
      }

      if (result.validationErrors) {
        dispatch(setValidationErrors({ key: `${provider}/${String(key)}`, errors: result.validationErrors }));
      }

      return result;
    } finally {
      setLoadingOf(key, false);
    }
  };

  return { loading, handleAPIResponse };
};

export const useValidationErrors = ({ key }: { key: string }) => {
  const dispatch = useDispatch();

  const validationErrors = useSelector((state: ReduxState) => state.core.validationErrors[key]);

  const clearValidationErrors = () => dispatch(storeClearValidationErrors({ key }));

  return { validationErrors, clearValidationErrors };
};
