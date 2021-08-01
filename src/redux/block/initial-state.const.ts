import {NodeEntity} from "../../entities/node.entity";

type BlockLookup = {
    [id: string]: NodeEntity;
}

const initialBlockLookup: BlockLookup = {};

const initialCompareFn: (b1: NodeEntity, b2: NodeEntity) => number = (b1, b2) => {
    if (!b1.priority && !b2.priority) return 0;
    if (!b1.priority) return 1;
    if (!b2.priority) return 0;
    return b2.priority - b1.priority;
}

const initialFilterFn: (node: NodeEntity) => boolean = () => true;

const initialOrder: string[] = [];

export const initialBlockState = {
    blocks: initialBlockLookup,
    compareFn: initialCompareFn,
    filterFn: initialFilterFn,
    order: initialOrder,
};

export type BlockSliceType = typeof initialBlockState;
