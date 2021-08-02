import {BackendNode} from "../types/node.type";

export class NodeEntity {
    constructor(input: Partial<NodeEntity> = {}) {
        Object.assign(this, input);
    }

    id!: string;

    title?: string;

    // Higher is more important
    importance: number = Math.random();

    static fromBackend(n: BackendNode) {
        const {title, meta = {}, importance} = n;
        const {id, isEnabled} = meta;
        if (!id || !isEnabled) {
            return;
        }
        return new NodeEntity({id, title, importance});
    }
}