import { Box, IconButton } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowTopIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowBottomIcon from "@material-ui/icons/KeyboardArrowDown";
import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

interface ColumnContainerProps {
  children: React.ReactNode;
  onClick: () => void;
  moveCellLeft: (rowIndex: number, cellIndex: number) => void;
  moveCellRight: (rowIndex: number, cellIndex: number) => void;
  moveCellUp: (rowIndex: number, cellIndex: number) => void;
  moveCellDown: (rowIndex: number, cellIndex: number) => void;
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
    moveCellDown,
    moveCellUp,
    deleteCell,
    rowIndex,
    colIndex,
  } = props;
  return (
    <Box position={"relative"}>
      <Box
        position={"absolute"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"middle"}
        width={"100%"}
        height={"100%"}
        className={classes.container}
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

            moveCellRight(rowIndex, colIndex);
          }}
        >
          <KeyboardArrowRightIcon />
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

            moveCellUp(rowIndex, colIndex);
          }}
        >
          <KeyboardArrowTopIcon />
        </IconButton>

        <IconButton
          className={classes.button}
          color="inherit"
          onClick={(e) => {
            e.stopPropagation();

            moveCellDown(rowIndex, colIndex);
          }}
        >
          <KeyboardArrowBottomIcon />
        </IconButton>
      </Box>

      <div className="inner-column">{children}</div>
    </Box>
  );
};
