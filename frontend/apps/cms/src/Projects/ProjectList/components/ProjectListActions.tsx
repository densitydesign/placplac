import { cloneElement } from 'react';
import { CreateButton, ListActionsProps, TopToolbar } from 'react-admin';
import { ImportProjectButton } from './ImportProjectButton';

export const ProjectListActions = (props: ListActionsProps) => {
  return (
    <TopToolbar className={props.className}>
      {props.filters && cloneElement(props.filters, { context: 'button' })}
      <ImportProjectButton />
      <CreateButton />
    </TopToolbar>
  );
};
