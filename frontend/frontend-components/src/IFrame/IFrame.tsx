import React from "react";
interface IFrameProps
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {}
export const IFrame = (props: IFrameProps) => {
  return <iframe {...props} />;
};
