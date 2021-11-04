import { Box } from "@material-ui/core";

export const EmptyColumn: React.FC = (props) => {
  return (
    <Box
      height={"300px"}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {props.children}
    </Box>
  );
};
