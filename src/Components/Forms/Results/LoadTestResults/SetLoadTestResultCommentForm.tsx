import Box from '@mui/material/Box';
import { BaseTextField } from '../../../TextFields/BaseTextField';
import { UpdateLoadTestResultRequest } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';

type SetLoadTestResultCommentFormProps = {
  request: UpdateLoadTestResultRequest;
  setRequest: (request: UpdateLoadTestResultRequest) => void;
};

export const SetLoadTestResultCommentForm: FC<SetLoadTestResultCommentFormProps> = (props) => {
  const { request, setRequest } = props;

  const onComment = (comment: string) => setRequest({ ...request, comment });

  return (
    <Box>
      <BaseTextField
        sx={{ mt: 0 }}
        value={request.comment || ''}
        onChange={onComment}
        label={'Comment'}
        multiline
        minRows={5}
        maxRows={7}
        maxLength={250}
      />
    </Box>
  );
};
