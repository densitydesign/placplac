import { Card, makeStyles } from "@material-ui/core";
import { ReactElement, ReactNode } from "react";
import {
  ListProps,
  useCheckMinimumRequiredProps,
  useListController,
  ListContextProvider,
  ListView,
} from "react-admin";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 0,
    transition: theme.transitions.create("margin-top"),
    position: "relative",
    flex: "1 1 auto",
    [theme.breakpoints.down("xs")]: {
      boxShadow: "none",
    },
    overflowX: "visible",
  },
}));

export const Container: React.FC = (props) => {
  const classes = useStyles();
  return <Card className={classes.root}>{props.children}</Card>;
};

export const CustomList = (
  props: Omit<ListProps, "actions"> & {
    children: ReactElement;
    topElement?: ReactNode;
    additionalActions?: ReactNode;
  }
): ReactElement => {
  useCheckMinimumRequiredProps("List", ["children"], props);
  const { additionalActions, topElement: TopE, ...listProps } = props;
  const controllerProps = useListController(listProps);
  const classes = useStyles();
  return (
    <ListContextProvider value={controllerProps}>
      {props.topElement && props.topElement}
      <ListView
        {...listProps}
        {...controllerProps}
        component={Container}
        classes={classes}
      />
    </ListContextProvider>
  );
};
