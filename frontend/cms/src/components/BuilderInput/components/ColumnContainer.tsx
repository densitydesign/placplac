import { Box } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowTopIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowBottomIcon from "@material-ui/icons/KeyboardArrowDown";
import Delete from "@material-ui/icons/Delete";
import { Button } from "react-admin";

interface ColumnContainerProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  moveCellLeft: (rowIndex: number, cellIndex: number) => void;
  moveCellRight: (rowIndex: number, cellIndex: number) => void;
  moveCellUp: (rowIndex: number, cellIndex: number) => void;
  moveCellDown: (rowIndex: number, cellIndex: number) => void;
  deleteCell: (rowIndex: number, cellIndex: number) => void;
  rowIndex: number;
  colIndex: number;
}
export const ColumnContainer = (props: ColumnContainerProps) => {
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
    <Box position={"relative"} display={"flex"} flex="1 auto">
      <Box position={"absolute"} width={"100%"} height={"100%"}>
        <Box
          position={"absolute"}
          top={0}
          display={"flex"}
          justifyContent={"center"}
          left={0}
          bottom={0}
        >
          <Box mt={"auto"} mb={"auto"}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                moveCellLeft(rowIndex, colIndex);
              }}
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </Box>
        </Box>
        <Box
          position={"absolute"}
          top={0}
          display={"flex"}
          justifyContent={"center"}
          right={0}
          bottom={0}
        >
          <Box mt={"auto"} mb={"auto"}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();

                moveCellRight(rowIndex, colIndex);
              }}
            >
              <KeyboardArrowRightIcon />
            </Button>
          </Box>
        </Box>
        <Box
          position={"absolute"}
          top={0}
          display={"flex"}
          justifyContent={"center"}
          right={0}
          left={0}
          bottom={0}
        >
          <Box mt={"auto"} mb={"auto"}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();

                deleteCell(rowIndex, colIndex);
              }}
            >
              <Delete />
            </Button>
          </Box>
        </Box>
        <Box
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          display={"flex"}
          justifyContent={"center"}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();

              moveCellUp(rowIndex, colIndex);
            }}
          >
            <KeyboardArrowTopIcon />
          </Button>
        </Box>{" "}
      </Box>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        display={"flex"}
        justifyContent={"center"}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();

            moveCellDown(rowIndex, colIndex);
          }}
        >
          <KeyboardArrowBottomIcon />
        </Button>
      </Box>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          width: "100%",
        }}
        className="inner-column"
        onClick={onClick}
      >
        {children}
      </div>
    </Box>
  );
};
