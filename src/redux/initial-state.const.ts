type BlockLookup = {
  [id: string]: Record<string, any>;
};

const initialBlockLookup: BlockLookup = {};

type ChildLookup = {
  [id: string]: {
    [id: string]: boolean;
  };
};

const initialChildLookup: ChildLookup = {};

export type ChildOrder = {
  [id: string]: string[];
};

const initialChildOrder: ChildOrder = {};

export type ParentLookup = {
  [id: string]: string;
};

const initialParentLookup: ParentLookup = {};

export const initialBlockState = {
  blocks: initialBlockLookup,
  isChildren: initialChildLookup,
  childrenOrder: initialChildOrder,
  findParent: initialParentLookup,
};

export type BlockSliceType = typeof initialBlockState;
