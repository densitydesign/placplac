import * as React from "react";
import { ReactElement } from "react";
import {
  useCheckMinimumRequiredProps,
  useListController,
  ListContextProvider,
} from "ra-core";
import { ListProps } from "react-admin";
import CustomListView from "./CustomListView";

export const CustomList = (
  props: ListProps & { children: ReactElement; breacrubms: React.ReactNode }
): ReactElement => {
  const { breacrubms, ...rest } = props;
  useCheckMinimumRequiredProps("List", ["children"], rest);
  const controllerProps = useListController(rest);
  return (
    <ListContextProvider value={controllerProps}>
      <CustomListView
        breadcrumbs={breacrubms}
        {...props}
        {...controllerProps}
      />
    </ListContextProvider>
  );
};

CustomList.defaultProps = {
  filter: {},
  perPage: 10,
};
