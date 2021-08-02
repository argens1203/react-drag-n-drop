import {
    addRelationship,
    initialRelationshipState,
    registerRelationship,
    relationshipReducer,
} from "../slice";
import {getParents} from "./get-parent.action";
import {IS_PARENT} from "../constants";
import {RelationshipType} from "../enums";

describe('get parent actions', () => {
    it('get parents', () => {
        const parent = 'p';
        const grandParent = 'gp';
        const child = 'c';

        let state = relationshipReducer(initialRelationshipState, registerRelationship({relationship: IS_PARENT, type: RelationshipType.TREE}));
        state = relationshipReducer(state, addRelationship({from: grandParent, to: parent, relationship: IS_PARENT}));
        state = relationshipReducer(state, addRelationship({from: parent, to: child, relationship: IS_PARENT}));

        // TODO: cleanup match
        expect(getParents(child, state)).toContain(grandParent);
        expect(getParents(child, state)).toContain(parent);
        expect(getParents(parent, state)).toEqual([grandParent]);
        expect(getParents(grandParent, state)).toEqual([]);
    })
});