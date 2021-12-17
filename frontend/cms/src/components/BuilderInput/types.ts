import { ReactElement } from "react";

export type PossibleColumns = Array<1 | 2 | 3 | 4>;

export type BuilderBlock = {
  description: string;
  form: {
    component: ReactElement<any>;
    getInitialContent?: (content: any) => any;
    getSaveContent?: (content: any) => any;
  };
  render: (content: any) => React.ReactElement;
};
export type BuilderBlocks = { [k: string]: BuilderBlock };
