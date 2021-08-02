import {NodeEntity} from "../entities";

const initialBlockLookup: {
    [id: string]: NodeEntity;
} = {};

const initialCompareFn: (b1: NodeEntity, b2: NodeEntity) => number = (b1, b2) => {
    if (!b1.importance && !b2.importance) return 0;
    if (!b1.importance) return 1;
    if (!b2.importance) return 0;
    return b2.importance - b1.importance;
}

const initialFilterFn: (node: NodeEntity) => boolean = () => true;

const initialOrder: string[] = [];

export const initialBlockState = {
    blocks: initialBlockLookup,
    compareFn: initialCompareFn,
    filterFn: initialFilterFn,
    order: initialOrder,
};

// TODO: rename to Node
export type BlockSliceType = typeof initialBlockState;
