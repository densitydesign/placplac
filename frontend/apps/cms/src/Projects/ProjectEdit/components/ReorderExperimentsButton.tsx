import { Experiment } from '@algocount/shared/types';
import React, { useEffect } from 'react';
import { useListContext, useNotify, useRecordContext } from 'react-admin';
import { Box, IconButton } from '@mui/material';
import { client } from '../../../dataProvider';
import { useProjectContext } from '../../../contexts/project-context';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMutation, useQueryClient } from 'react-query';
export const ReorderExperimentsButton = () => {
  const { project } = useProjectContext();
  const { data: experimentList } = useListContext<Experiment>();
  const { id: experimentId } = useRecordContext<Experiment>();
  const notify = useNotify();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (type: '+' | '-') => {
      const normalize = (index: number) => {
        if (index < 0) return 0;
        if (index >= experimentList.length) return experimentList.length - 1;
        return index;
      };
      const index = experimentList.findIndex(
        (experiment) => experiment.id === experimentId
      );
      const newIndex = normalize(type === '+' ? index + 1 : index - 1);

      const reorderedExperiments = [...experimentList];
      const removedElement = reorderedExperiments.splice(index, 1);
      reorderedExperiments.splice(newIndex, 0, ...removedElement);
      return client('experiments/reorder', {
        method: 'post',
        data: {
          project,
          experiments: reorderedExperiments.map((exp) => exp.id),
        },
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
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
