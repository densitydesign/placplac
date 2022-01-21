import * as React from "react";
import { Children, cloneElement } from "react";
import Card from "@material-ui/core/Card";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import {
  defaultExporter,
  useListContext,
  getListControllerProps,
  useVersion,
} from "ra-core";
import {
  BulkActionsToolbar,
  Title,
  BulkDeleteButton,
  Empty,
  ListActions,
  Pagination,
  ListViewProps,
} from "react-admin";
import CustomListToolbar from "./CustomListToolbar";

export const ListView = (
  props: ListViewProps & { breadcrumbs: React.ReactNode }
) => {
  const {
    actions,
    aside,
    filters,
    bulkActionButtons,
    pagination,
    children,
    className,
    classes: classesOverride,
    component: Content,
    exporter = defaultExporter,
    title,
    empty,
    breadcrumbs,
    ...rest
  } = props;
  const controllerProps = getListControllerProps(props); // deprecated, to be removed in v4
  const listContext = useListContext(props);
  const classes = useStyles(props);
  const { defaultTitle, total, loaded, loading, filterValues, selectedIds } =
    listContext;
  const version = useVersion();

  const renderList = () => (
    <>
      {(filters || actions) && (
        <CustomListToolbar
          breadcrumbs={breadcrumbs}
          {...controllerProps} // deprecated, use ListContext instead, to be removed in v4
          actions={actions}
          exporter={exporter} // deprecated, use ListContext instead, to be removed in v4
        />
      )}
      <div className={classes.main}>
        {Content && (
          <Content
            className={classnames(classes.content, {
              [classes.bulkActionsDisplayed]: selectedIds.length > 0,
            })}
            key={version}
          >
            {bulkActionButtons !== false && bulkActionButtons && (
              <BulkActionsToolbar {...controllerProps}>
                {bulkActionButtons}
              </BulkActionsToolbar>
            )}
            {children &&
              // @ts-ignore-line
              cloneElement(Children.only(children), {
                ...controllerProps, // deprecated, use ListContext instead, to be removed in v4
                hasBulkActions: bulkActionButtons !== false,
              })}
            {pagination && cloneElement(pagination, listContext)}
          </Content>
        )}
        {aside && cloneElement(aside, listContext)}
      </div>
    </>
  );

  const shouldRenderEmptyPage =
    loaded && !loading && total === 0 && !Object.keys(filterValues).length;

  return (
    <div
      className={classnames("list-page", classes.root, className)}
      {...sanitizeRestProps(rest)}
    >
      <Title title={title} defaultTitle={defaultTitle} />
      {shouldRenderEmptyPage && empty !== false
        ? cloneElement(empty!, listContext)
        : renderList()}
    </div>
  );
};

const DefaultBulkActionButtons = (props: any) => (
  <BulkDeleteButton {...props} />
);

ListView.defaultProps = {
  actions: <ListActions />,
  classes: {},
  component: Card,
  bulkActionButtons: <DefaultBulkActionButtons />,
  pagination: <Pagination />,
  empty: <Empty />,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    main: {
      display: "flex",
    },
    content: {
      marginTop: 0,
      transition: theme.transitions.create("margin-top"),
      position: "relative",
      flex: "1 1 auto",
      [theme.breakpoints.down("xs")]: {
        boxShadow: "none",
      },
      overflow: "inherit",
    },
    bulkActionsDisplayed: {
      marginTop: -theme.spacing(8),
      transition: theme.transitions.create("margin-top"),
    },
    actions: {
      zIndex: 2,
      display: "flex",
      justifyContent: "flex-end",
      flexWrap: "wrap",
    },
    noResults: { padding: 20 },
  }),
  { name: "RaList" }
);

const sanitizeRestProps: (
  props: Omit<
    ListViewProps,
    | "actions"
    | "aside"
    | "filter"
    | "filters"
    | "bulkActionButtons"
    | "pagination"
    | "children"
    | "className"
    | "classes"
    | "component"
    | "exporter"
    | "title"
    | "empty"
  >
) => any = ({
  basePath = null,
  currentSort = null,
  data = null,
  defaultTitle = null,
  displayedFilters = null,
  filterDefaultValues = null,
  filterValues = null,
  hasCreate = null,
  hasEdit = null,
  hasList = null,
  hasShow = null,
  hideFilter = null,
  history = null,
  ids = null,
  loading = null,
  loaded = null,
  location = null,
  match = null,
  onSelect = null,
  onToggleItem = null,
  onUnselectItems = null,
  options = null,
  page = null,
  permissions = null,
  perPage = null,
  refetch = null,
  resource = null,
  selectedIds = null,
  setFilters = null,
  setPage = null,
  setPerPage = null,
  setSort = null,
  showFilter = null,
  syncWithLocation = null,
  sort = null,
  total = null,
  ...rest
}) => rest;

export default ListView;
