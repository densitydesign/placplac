import React from "react";

interface ColumnContainerProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export const ColumnContainer = (props: ColumnContainerProps) => {
  const { children, onClick } = props;
  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        width: "100%",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
