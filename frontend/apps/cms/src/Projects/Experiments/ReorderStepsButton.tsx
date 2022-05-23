import { Experiment } from '@algocount/shared/types';
import React, { useEffect } from 'react';
import { useListContext, useNotify, useRecordContext } from 'react-admin';
import { Box, IconButton } from '@mui/material';
import { client } from '../../dataProvider';
import { useProjectContext } from '../../contexts/project-context';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMutation, useQueryClient } from 'react-query';
import { Step } from '../../types';
export const ReorderStepsButton = () => {
  const { data: stepList } = useListContext<Step>();
  const { experiment: experimentId, id } = useRecordContext<Step>();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (type: '+' | '-') => {
      const normalize = (index: number) => {
        if (index < 0) return 0;
        if (index >= stepList.length) return stepList.length - 1;
        return index;
      };
      const index = stepList.findIndex((step) => step.id === id);
      const newIndex = normalize(type === '+' ? index + 1 : index - 1);

      const reorderedSteps = [...stepList];
      const removedElement = reorderedSteps.splice(index, 1);
      reorderedSteps.splice(newIndex, 0, ...removedElement);
      return client('steps/reorder', {
        method: 'post',
        data: {
          experiment: experimentId,
          steps: reorderedSteps.map((exp) => exp.id),
        },
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('experiments'),
      onError: () => notify('Error', { type: 'error' }),
    }
  );

  return (
    <Box display="flex" alignItems={'center'}>
      <IconButton disabled={isLoading} onClick={() => mutate('-')}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton disabled={isLoading} onClick={() => mutate('+')}>
        <ArrowDownwardIcon />
      </IconButton>
    </Box>
  );
};
