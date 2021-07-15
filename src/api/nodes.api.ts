import axios from "axios";
import {BASE_URL} from "./config";
import {BackendNode} from "./types/node.type";
import {deserialize} from "class-transformer";

export async function getAllNodes(): Promise<BackendNode[]> {
    const nodes = await axios.get(`${BASE_URL}/nodes`).then(res => res.data.data);
    return nodes.map((n: any) => deserialize(BackendNode, JSON.stringify(n)));
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
