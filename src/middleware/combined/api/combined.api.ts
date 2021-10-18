import axios from "axios";
import {BASE_URL} from "../../../config";
import {BackendNode} from "../../nodes/entities";
import {deserialize} from "class-transformer";
import { BackendRelationship } from "../../relationships/entities";

type CombinedReturn = {
    links: BackendRelationship[],
    nodes: BackendNode[],
};

export async function getChildren(id: string): Promise<CombinedReturn>{
    const {nodes, links} = await axios.get(`${BASE_URL}/nodes/${id}/children`)
    .then(res => res.data.data);
    return {
        nodes: nodes.map((n: any) => deserialize(BackendNode, JSON.stringify(n))),
        links: links.map((l: any) => deserialize(BackendRelationship, JSON.stringify(l))),
    }
}

export async function createChildren(id: string, body: Record<string, any>): Promise<CombinedReturn>{
    const {nodes, links} = await axios.post(`${BASE_URL}/nodes/${id}/children`)
    .then(res => res.data.data);
    return {
        nodes: nodes.map((n: any) => deserialize(BackendNode, JSON.stringify(n))),
        links: links.map((l: any) => deserialize(BackendRelationship, JSON.stringify(l))),
    };
}