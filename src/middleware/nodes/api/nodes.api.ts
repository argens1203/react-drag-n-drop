import axios from "axios";
import {BASE_URL} from "../../../config";
import {BackendNode} from "../entities";
import {deserialize} from "class-transformer";

export async function getAllNodes(): Promise<BackendNode[]> {
    const nodes = await axios.get(`${BASE_URL}/nodes`).then(res => res.data.data);
    return nodes.map((n: any) => deserialize(BackendNode, JSON.stringify(n)));
}

type CursorNodes = {
    cursor?: string;
    nodes: BackendNode[];
}

type CursorLimit = {
    cursor?: string;
    limit?: number;
}

export async function getNodes(input?: CursorLimit): Promise<CursorNodes> {
    const {cursor, limit = 3} = input || {};
    const sortBy = 'createdAt';
    const {items, cursor: nextCursor} = await axios.get(`${BASE_URL}/nodes`, {
        params: {
            limit, 
            cursor,
            sortBy,
        }
    }).then (res => res.data.data || {});

    return {
        cursor: nextCursor,
        nodes: items.map((item: any) => deserialize(BackendNode, JSON.stringify(item))),
    };
}

export async function getNodeByTitle(title: string): Promise<BackendNode | undefined> {
    const n = await axios.get(`${BASE_URL}/nodes/title/${title}`).then(res => res.data.data);
    return deserialize(BackendNode, JSON.stringify(n));
}

export async function createNode(): Promise<BackendNode> {
    const n = await axios.post(`${BASE_URL}/nodes`).then(res => res.data.data);
    return deserialize(BackendNode, JSON.stringify(n));
}

export async function getNode(id: string) {
    const n = await axios.get(`${BASE_URL}/nodes/${id}`).then(res => res.data.data);
    return deserialize(BackendNode, JSON.stringify(n));
}

export async function editNode(id: string, updates: Partial<BackendNode>) {
    const n = await axios.patch(`${BASE_URL}/nodes/${id}`, updates).then(res => res.data.data);
    return deserialize(BackendNode, JSON.stringify(n));
}

export async function removeNode(id: string) {
    return await axios.delete(`${BASE_URL}/nodes/${id}`).then(res => res.data);
}
