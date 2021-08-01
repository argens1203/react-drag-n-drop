import {BackendNode} from "../api/types/node.type";

export class NodeEntity {
    constructor(input: Partial<NodeEntity> = {}) {
        Object.assign(this, input);
    }

    id!: string;

    title?: string;

    priority?: number;

    static fromBackend(n: BackendNode) {
        const {title, meta = {}, priority} = n;
        const {id, isEnabled} = meta;
        if (!id || !isEnabled) {
            return;
        }
        return new NodeEntity({id, title, priority});
    }
}