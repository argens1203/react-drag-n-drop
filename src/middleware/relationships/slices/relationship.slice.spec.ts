import reducer, {addRelationship, registerRelationship, removeRelationship} from './relationship.slice';
import {initialRelationshipState} from "../constants/initial-state.const";
import {RelationshipType} from "../enums/relationship-type.enum";
import {AnyAction} from "@reduxjs/toolkit";

describe('relationship slice', () => {
    it('should initialise', () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialRelationshipState);
    });

    describe('register relationship', () => {
        it('can register relationship', () => {
            const relationship = 'relationship';
            let state = reducer(initialRelationshipState, registerRelationship({
                relationship,
                type: RelationshipType.ONE_TO_MANY
            }));
            expect(state.type[relationship]).toBe(RelationshipType.ONE_TO_MANY);
            expect(state.lookup[relationship]).toEqual({});
            expect(state.reverseLookup[relationship]).toEqual({});
            expect(state.order[relationship]).toEqual({});
        })
    })

    describe('add relationship', () => {
        it('can add relationship', () => {
            const relationship = 'relationship';
            const from = 'from';
            const to = 'to';

            let state = reducer(initialRelationshipState, registerRelationship({
                relationship,
                type: RelationshipType.ONE_TO_MANY
            }));
            state = reducer(state, addRelationship({from, to, relationship}));

            expect(state.lookup[relationship][from][to]).toBe(true);
            expect(state.reverseLookup[relationship][to][from]).toBe(true);
        });
    });

    describe('remove relationship', () => {
        it('can remove relationship', () => {
            const relationship = 'relationship';
            const from = 'from';
            const to = 'to';

            let state = reducer(initialRelationshipState, registerRelationship({
                relationship,
                type: RelationshipType.ONE_TO_MANY
            }));
            state = reducer(state, addRelationship({from, to, relationship}));
            state = reducer(state, removeRelationship({from, to, relationship}));

            expect(state.lookup[relationship]?.[from]?.[to]).not.toBeTruthy();
            expect(state.reverseLookup[relationship]?.[to]?.[from]).not.toBeTruthy();
        });

        it('can remove multiple relationships from the same id', () => {
            const relationship = 'relationship';
            const from = 'from';
            const to1 = 'to1';
            const to2 = 'to2';

            let state = reducer(initialRelationshipState, registerRelationship({
                relationship,
                type: RelationshipType.ONE_TO_MANY
            }));
            state = reducer(state, addRelationship({from, to: to1, relationship}));
            state = reducer(state, addRelationship({from, to: to2, relationship}));
            state = reducer(state, removeRelationship({from, relationship}));

            expect(state.lookup[relationship]?.[from]?.[to1]).not.toBeTruthy();
            expect(state.reverseLookup[relationship]?.[to1]?.[from]).not.toBeTruthy();
            expect(state.lookup[relationship]?.[from]?.[to2]).not.toBeTruthy();
            expect(state.reverseLookup[relationship]?.[to2]?.[from]).not.toBeTruthy();
        })

        it('can remove multiple relationships to the same id', () => {
            const relationship = 'relationship';
            const from1 = 'from1';
            const from2 = 'from2';
            const to = 'to';

            let state = reducer(initialRelationshipState, registerRelationship({
                relationship,
                type: RelationshipType.ONE_TO_MANY
            }));
            state = reducer(state, addRelationship({from: from1, to, relationship}));
            state = reducer(state, addRelationship({from: from2, to, relationship}));
            state = reducer(state, removeRelationship({to, relationship}));

            expect(state.lookup[relationship]?.[from1]?.[to]).not.toBeTruthy();
            expect(state.reverseLookup[relationship]?.[to]?.[from1]).not.toBeTruthy();
            expect(state.lookup[relationship]?.[from2]?.[to]).not.toBeTruthy();
            expect(state.reverseLookup[relationship]?.[to]?.[from2]).not.toBeTruthy();
        })
    });

    describe('abuse', () => {
        it('add unregistered relationship', () => {
            const action = () => reducer(initialRelationshipState, addRelationship({
                from: 'from',
                to: 'to',
                relationship: 'unregistered'
            }));
            expect(action).not.toThrow();
        })
        it('remove unregistered & not-added relationship', () => {
            const action = () => reducer(initialRelationshipState, removeRelationship({
                from: 'from',
                to: 'to',
                relationship: 'unregistered'
            }));
            expect(action).not.toThrow();
        })
    })
});