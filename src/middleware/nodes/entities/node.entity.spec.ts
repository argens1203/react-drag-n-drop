import {NodeEntity} from "./node.entity";
import {BackendNode, BackendNodeMeta} from "../types/node.type";

describe('node entity', () => {
    it('from backend', () => {
        const meta = new BackendNodeMeta({id: '1', isEnabled: true});
        const backendNode = new BackendNode({meta, importance: 2});
        const node = NodeEntity.fromBackend(backendNode);

        expect(node?.importance).toBe(2);
    })
});