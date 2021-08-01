type BlockLookup = {
    [id: string]: Record<string, any>
}

const initialBlockLookup: BlockLookup = {};

export const initialBlockState = {
    blocks: initialBlockLookup,
};

export type BlockSliceType = typeof initialBlockState;
