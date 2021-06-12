type BlockLookup = {
    [id: string]: Record<string, any>
}

const initialBlockLookup: BlockLookup = {};

type ParentLookup = {
    [id: string]: string
}

const initialParentLookup: ParentLookup = {};

const initialRoot: Record<string, boolean> = {};

export const initialBlockState = {
    blocks: initialBlockLookup,
    findParent: initialParentLookup,
    root: initialRoot
}