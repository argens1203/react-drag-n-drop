import {BackendNode} from "./node-backend.entity";

export class NodeEntity {
    constructor(input: Partial<NodeEntity> = {}) {
        Object.assign(this, input);
    }

    id!: string;

    title?: string;

    data?: any;

    // Higher is more important
    importance: number = Math.random();

    static fromBackend(n: BackendNode) {
        const {title, meta = {}, importance, ...rest} = n;
        const {id, isEnabled} = meta;
        if (!id || !isEnabled) {
            return;
        }
        return new NodeEntity({id, title, importance, ...rest});
    }
}