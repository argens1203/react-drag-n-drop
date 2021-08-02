import {RelationshipSliceType} from "../slice";
import {IS_PARENT} from "../constants";

// TODO: tests
export function getChildren(parentId: string, state: RelationshipSliceType) {
    const lookup = state.lookup[IS_PARENT][parentId] || {}
    // TODO: reuse this func
    return Object.entries(lookup).filter(([, v]) => !!v).map(([k,]) => k);
}