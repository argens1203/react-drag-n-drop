import axios from "axios";
import {BASE_URL} from "../../../config";
import {deserialize} from "class-transformer";
import {BackendRelationship} from "../entities";

// Here, child should points towards parents
// {from: child, to: parent}
// Swap at a higher level

type Input = {
    from: string,
    to: string,
}

export async function createRelationship(input: Input) {
    const {from, to} = input;
    const n = await axios.post(`${BASE_URL}/relationships/belongs/from/${from}/to/${to}`).then(res => res.data.data);
    return deserialize(BackendRelationship, JSON.stringify(n));
}

export async function removeRelationship(input: Input) {
    const {from, to} = input;
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



