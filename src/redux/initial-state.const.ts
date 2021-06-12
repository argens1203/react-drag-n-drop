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

export const initialBlockState = {
    blocks: initialBlockLookup,
    isChildren: initialChildLookup,
    root: initialRoot
};
