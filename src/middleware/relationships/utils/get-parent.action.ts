import {IS_PARENT} from "../constants";
import {RelationshipSliceType} from "../slice";

export function getParent(child: string, state: RelationshipSliceType) {
    const lookup = state.reverseLookup[IS_PARENT]?.[child] || {};
    const parents = Object.entries(lookup).filter(([, v]) => !!v).map(([k,]) => k) || [undefined];
    return parents[0];
}

export function getParents(child: string, state: RelationshipSliceType){
    const parents = [];
    let parent = getParent(child, state);
    while (parent){
        parents.push(parent);
        parent = getParent(parent, state);
    }
    return parents;
}