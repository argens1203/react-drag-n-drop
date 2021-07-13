import {BackendNode} from "../api/types/node.type";

export class NodeEntity {
    constructor(input: Partial<NodeEntity> = {}) {
        Object.assign(this, input);
    }

    id!: string;

    title?: string;

    static fromBackend(n: BackendNode) {
        const {title, meta = {}} = n;
        const {id, isEnabled} = meta;
        if (!id || !title || !isEnabled) {
            return;
        }
        return new NodeEntity({id, title});
    }
}