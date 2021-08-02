import {RelationshipSliceType} from "../slice";

type Params = {
    relationship: string;
    from: string;
    to: string;
}

export function removeRelationshipReducer (params: Params, state: RelationshipSliceType){
    const {relationship, from, to} = params;

    if (state.lookup?.[relationship]?.[from]?.[to]){
        state.lookup[relationship][from][to] = false;
    }
    if (state.reverseLookup?.[relationship]?.[to]?.[from]){
        state.reverseLookup[relationship][to][from] = false;
    }
}