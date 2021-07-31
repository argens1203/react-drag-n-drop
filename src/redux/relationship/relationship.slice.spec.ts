import reducer, {addRelationship, registerRelationship, removeRelationship} from './relationship.slice';
import {initialRelationshipState} from "./initial-state.const";
import {RelationshipType} from "./relationship-type.enum";

describe('relationship slice', () => {
    it('should initialise', () => {
        expect(reducer(undefined, {})).toEqual(initialRelationshipState);
    });

    it('can add relationship', () => {
        const relationship = 'relationship';
        const from = 'from';
        const to = 'to';

        let state = reducer(initialRelationshipState, registerRelationship({relationship, type: RelationshipType.ONE_TO_MANY}));
        state = reducer(state, addRelationship({from, to, relationship}));

        expect(state.lookup[relationship][from][to]).toBe(true);
        expect(state.reverseLookup[relationship][to][from]).toBe(true);
    });

    it ('can remove relationship', () => {
        const relationship = 'relationship';
        const from = 'from';
        const to = 'to';

        let state = reducer(initialRelationshipState, registerRelationship({relationship, type: RelationshipType.ONE_TO_MANY}));
        state = reducer(state, addRelationship({from, to, relationship}));
        state = reducer(state, removeRelationship({from, to, relationship}));

        expect(state.lookup[relationship]?.[from]?.[to]).not.toBeTruthy();
        expect(state.reverseLookup[relationship]?.[to]?.[from]).not.toBeTruthy();
    })
});