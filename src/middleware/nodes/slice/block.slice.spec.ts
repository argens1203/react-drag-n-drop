import reducer, {editBlock, putBlock, removeBlock} from './block.slice';
import {initialBlockState} from "./initial-state";
import {AnyAction} from "@reduxjs/toolkit";

describe('data slice', () => {
    it('should initialise', () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(initialBlockState);
    });

    describe('put block', () => {
        it('can put block', () => {
            const id = 'id';
            const block = {id, color: 'color'};
            const nextState = reducer(initialBlockState, putBlock(block));

            expect(nextState.blocks[id]).toEqual(block);
        });

        test.skip('idempotency', () => {});
    })

    describe('edit block', () => {
        it('can edit block', () => {
            const id = 'id';
            let state = reducer(initialBlockState, putBlock({id, color: 'color'}));
            state = reducer(state, editBlock({id, color: 'new color'}))

            expect(state.blocks[id].color).toEqual('new color');
        });

        it('can do partial edit', () => {
            const id = 'id';
            let state = reducer(initialBlockState, putBlock({id, color: 'color', title: 'title'}));
            state = reducer(state, editBlock({id, color: 'new color'}))

            expect(state.blocks[id].color).toEqual('new color');
            expect(state.blocks[id].title).toEqual('title');
        });

        test.skip('idempotency', () => {});
    })

    it('can remove block', () => {
        const id = 'id';
        const block = {id, title: 'meh'}
        let state = reducer(initialBlockState, putBlock(block));
        state = reducer(state, removeBlock(id));

        expect(state.blocks).toEqual({});
    });

    describe('ordering', () => {
        it('should work on putting blocks', () =>{
            let state = reducer(initialBlockState, putBlock({id: 'id', importance: 1}));
            state = reducer(state, putBlock({id: 'another', importance: 2}));

            expect(state.order).toEqual(['another', 'id']);
        });

        it('should work on editing blocks', () => {
            let state = reducer(initialBlockState, putBlock({id: 'id', importance: 1}));
            state = reducer(state, putBlock({id: 'another', importance: 2}));
            state = reducer(state, editBlock({id: 'id', importance: 3}));

            expect(state.order).toEqual(['id', 'another']);
        });

        it('should work on removing blocks', () => {
            let state = reducer(initialBlockState, putBlock({id: 'id', importance: 1}));
            state = reducer(state, putBlock({id: 'another', importance: 2}));

            state = reducer(state, removeBlock('id'));
            expect(state.order).toEqual(['another']);
        })
    })
})
