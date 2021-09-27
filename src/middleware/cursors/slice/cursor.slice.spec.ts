import reducer, {setCursor} from './cursor.slice';
import {AnyAction} from "@reduxjs/toolkit";
import { initialCursorState } from './initial-state';
import { CursorType } from '../enums';

describe('relationship slice', () => {
    it('should initialise', () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialCursorState);
    });

    describe('set cursor', () => {
        it('can set cursor', () => {
            const parent = 'parent';
            const cursor = 'cursor';
            let state = reducer(initialCursorState, setCursor({
                parent,
                cursor,
                type: CursorType.BACKWARD,
            }));
            expect (state.BACKWARD[parent]).toBe(cursor);
        })
    })
});