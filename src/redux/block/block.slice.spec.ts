import reducer, {editBlock, putBlock, removeBlock} from './block.slice';
import {initialBlockState} from "./initial-state.const";
import {AnyAction} from "@reduxjs/toolkit";

describe('data slice', () => {
    it('should initialise', () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialBlockState);
    });

    it('can put block', () => {
        const id = 'id';
        const block = {id, color: 'color'};
        const nextState = reducer(initialBlockState, putBlock(block));

        expect(nextState.blocks[id]).toEqual(block);
    });

    it('can edit block ', () => {
        const id = 'id';
        let state = reducer(initialBlockState, putBlock({id, color: 'color'}));
        state = reducer(state, editBlock({id, color: 'new color'}))

        expect(state.blocks[id].color).toEqual('new color');
    });

    it('can do partial edit ', () => {
        const id = 'id';
        let state = reducer(initialBlockState, putBlock({id, color: 'color', title: 'title'}));
        state = reducer(state, editBlock({id, color: 'new color'}))

        expect(state.blocks[id].color).toEqual('new color');
        expect(state.blocks[id].title).toEqual('title');
    });

    it('can remove block ', () => {
        const id = 'id';
        const block = {id, title: 'meh'}
        let state = reducer(initialBlockState, putBlock(block));
        state = reducer(state, removeBlock(id));

        expect(state.blocks).toEqual({});
    })
})
