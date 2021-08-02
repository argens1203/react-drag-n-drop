import axios from "axios";
import {BASE_URL} from "../../../config";
import {deserialize} from "class-transformer";
import {BackendRelationship} from "../types/relationship.type";

export async function createRelationship(from: string, to: string) {
    const n = await axios.post(`${BASE_URL}/relationships/belongs/from/${from}/to/${to}`).then(res => res.data.data);
    return deserialize(BackendRelationship, JSON.stringify(n));
}

export async function removeRelationship(from: string, to: string) {
    return await axios.delete(`${BASE_URL}/relationships/belongs/from/${from}/to/${to}`)
}

class Params {
    from?: string;
    to?: string;
}

export async function getRelationships(params: Params): Promise<BackendRelationship[]> {
    const {from, to} = params;
    if (!from && !to) {
        return []
    }
    let url = `${BASE_URL}/relationships/belongs`;
    if (from) {
        url = url + `/from/${from}`;
    }
    if (to) {
        url = url + `/to/${to}`;
    }
    const relationships = await axios.get(url).then(res => res.data.data);
    return relationships.map((r: any) => deserialize(BackendRelationship, JSON.stringify(r)))
}



