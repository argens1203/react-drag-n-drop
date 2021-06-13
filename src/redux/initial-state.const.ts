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

const initialRoot: Record<string, boolean> = {};

export type ParentLookup = {
    [id: string]: string | null;
}

const initialParentLookup: ParentLookup = {};

export const initialBlockState = {
    blocks: initialBlockLookup,
    isChildren: initialChildLookup,
    findParent: initialParentLookup,
    root: initialRoot
};
