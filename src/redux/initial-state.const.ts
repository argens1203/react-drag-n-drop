type BlockLookup = {
    [id: string]: Record<string, any>
}

const initialBlockLookup: BlockLookup = {};

type ChildLookup = {
    [id: string]: {
        [id: string]: boolean
    }
}

const initialChildLookup: ChildLookup = {};

export type ParentLookup = {
    [id: string]: string;
}

const initialParentLookup: ParentLookup = {};

export const initialBlockState = {
    blocks: initialBlockLookup,
    isChildren: initialChildLookup,
    findParent: initialParentLookup
};

export type BlockSliceType = typeof initialBlockState;
