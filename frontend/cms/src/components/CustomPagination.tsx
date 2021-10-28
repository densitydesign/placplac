import { Pagination, PaginationProps } from "react-admin";

export const CustomPagination = (props: PaginationProps) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);
