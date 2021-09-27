import {reducer} from "./store";
import {AnyAction} from "@reduxjs/toolkit";
import {initialBlockState} from "../nodes/slice";
import {initialRelationshipState} from "../relationships/slice";
import { initialCursorState } from "../cursors/slice/initial-state";

describe('root store', () => {
    it('should initialise', () => {
        let state = reducer(undefined, {} as AnyAction);
        expect(state).toEqual({block: initialBlockState, relationship: initialRelationshipState, cursor: initialCursorState})
    })
})