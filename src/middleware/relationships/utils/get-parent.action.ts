import {IS_PARENT} from "../constants/relationship.const";
import {RootState} from "../../store/store";

export function getParent(child: string, state: RootState) {
    const lookup = state.relationship.reverseLookup[IS_PARENT]?.[child] || {};
    const parents = Object.entries(lookup).filter(([, v]) => !!v).map(([k,]) => k) || [undefined];
    return parents[0];
}