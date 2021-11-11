export type PossibleColumns = Array<1 | 2 | 3 | 4>;

export type BuilderBlock =
  | "text"
  | "image"
  | "listExperimentSetup"
  | "rawGraph";

export type PossibleComponent = {
  [type in BuilderBlock]: { title: string };
};

export type DialogForm = undefined | BuilderBlock;
