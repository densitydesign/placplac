import { Box, IconButton } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

interface ColumnContainerProps {
  children: React.ReactNode;
  onClick: () => void;
  moveCellLeft: (rowIndex: number, cellIndex: number) => void;
  moveCellRight: (rowIndex: number, cellIndex: number) => void;
  deleteCell: (rowIndex: number, cellIndex: number) => void;
  rowIndex: number;
  colIndex: number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    "&:hover": {
      backgroundColor: "black",
      opacity: 0.7,
      "& $button": {
        display: "flex",
      },
    },
  },
  button: { display: "none", color: "white" },
}));

export const ColumnContainer = (props: ColumnContainerProps) => {
  const classes = useStyles();
  const {
    children,
    onClick,
    moveCellLeft,
    moveCellRight,

    deleteCell,
    rowIndex,
    colIndex,
  } = props;
  return (
    <Box position={"relative"}>
      <Box
        position={"absolute"}
        width={"100%"}
        height={"100%"}
        display={"flex"}
        className={classes.container}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"middle"}
          mt="auto"
          mb="auto"
          width={"100%"}
        >
          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();
              moveCellLeft(rowIndex, colIndex);
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>

          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();

              deleteCell(rowIndex, colIndex);
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();

              onClick();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className={classes.button}
            color="inherit"
            onClick={(e) => {
              e.stopPropagation();

              moveCellRight(rowIndex, colIndex);
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>

      <div className="inner-column">{children}</div>
    </Box>
  );
};
