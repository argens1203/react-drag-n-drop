import {BackendRelationship} from "../entities";

export async function createRelationship(from: string, to: string): Promise<void> {
    return;
}

export async function removeRelationship(from: string, to: string): Promise<void> {
    return;
}

class Params {
    from?: string;
    to?: string;
}

export async function getRelationships(params: Params): Promise<BackendRelationship[]> {
    return [];
}
