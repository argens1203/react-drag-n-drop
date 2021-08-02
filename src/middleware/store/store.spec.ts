import {reducer} from "./store";
import {AnyAction} from "@reduxjs/toolkit";
import {initialBlockState} from "../nodes/constants/initial-state.const";
import {initialRelationshipState} from "../relationships/constants/initial-state.const";

describe('root store', () => {
    it('should initialise', () => {
        let state = reducer(undefined, {} as AnyAction);
        expect(state).toEqual({block: initialBlockState, relationship: initialRelationshipState})
    })
})