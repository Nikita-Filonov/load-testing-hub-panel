import Box from '@mui/material/Box';
import { BaseTextField } from '../../../TextFields/BaseTextField';
import { UpdateLoadTestResultRequest } from '../../../../Models/Results/LoadTestResults';
import { FC, useMemo } from 'react';
import { Button } from '@mui/material';
import { ValidationError } from '../../../../Services/Clients/Models';
import { getValidationError } from '../../../../Services/Clients/Utils';

type SetLoadTestResultCommentFormProps = {
  request: UpdateLoadTestResultRequest;
  setRequest: (request: UpdateLoadTestResultRequest) => void;
  validationErrors: ValidationError[];
};

export const SetLoadTestResultCommentForm: FC<SetLoadTestResultCommentFormProps> = (props) => {
  const { request, setRequest, validationErrors } = props;

  const onComment = (comment: string) => setRequest({ ...request, comment });

  const onClear = () => onComment('');

  const errors = useMemo(
    () => ({
      comment: getValidationError({
        location: 'body.comment',
        validationErrors
      })
    }),
    [validationErrors]
  );

  return (
    <Box>
      <BaseTextField
        sx={{ mt: 0 }}
        value={request.comment || ''}
        onChange={onComment}
        label={'Comment'}
        error={Boolean(errors.comment)}
        helperText={errors.comment?.msg}
        placeholder={'Leave any comment to result here'}
        multiline
        minRows={5}
        maxRows={7}
      />
      <Button sx={{ mt: 3 }} size={'small'} variant={'outlined'} onClick={onClear}>
        Clear comment
      </Button>
    </Box>
  );
};
