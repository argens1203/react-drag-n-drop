import {BackendRelationship} from "../types/relationship.type";

export class RelationshipEntity {
    constructor(input: Partial<RelationshipEntity> = {}) {
        Object.assign(this, input);
    }

    id!: string;

    from?: string;

    to?: string;

    rank?: number;

    // TODO: sanity check
    static fromBackend(n: BackendRelationship) {
        const {meta = {}, from, to} = n;
        const {id, rank} = meta;
        console.log('id', id);
        console.log('rank', rank);
        console.log('from', from);
        console.log('to', to);
        if (!id || !rank || !from || !to) {
            return;
        }
        return new RelationshipEntity({
            id, from, to, rank
        })
    }
}