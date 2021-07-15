import reducer, {editBlock, putBlock, removeBlock, setParent} from './data.slice';
import {initialBlockState} from "./initial-state.const";

describe('data slice', () => {
    const id = 'ID-123';
    const color = 'red';
    const parentId = 'ID-456';
    const parentColor = 'white';
    const getParent = () => {
        return {id: parentId, color: parentColor};
    }
    const getBlock = () => {
        return {id, color};
    }
    it('should initialise', () => {
        expect(reducer(undefined, {})).toEqual(initialBlockState);
    });

    it('should put block', () => {
        const block = getBlock();
        const nextState = reducer(initialBlockState, putBlock(block));

        expect(nextState.blocks[id]).toEqual(block);
    });

    it('should edit block ', () => {
        const block = getBlock();
        const color = 'blue'
        const state = reducer(initialBlockState, putBlock(block));
        const nextState = reducer(state, editBlock({id, color}))

        expect(nextState.blocks[id].color).toEqual(color);

    })
    describe('remove block', () => {
        it('should remove block ', () => {
            const block = getBlock();
            const state = reducer(initialBlockState, putBlock(block));
            const next = reducer(state, removeBlock(id));

            expect(next.blocks).toEqual({});
        })
        //
        // it('should remove block that has parent', () => {
        //     const block = getBlock();
        //     const state = reducer(initialBlockState, putBlock(block));
        // })
    })

    it('should set parent', () => {
        const block = getBlock();
        const parent = getParent();
        const state1 = reducer(initialBlockState, putBlock(block));
        const state2 = reducer(state1, putBlock(parent));
        const state3 = reducer(state2, setParent({child: block.id, parent: parent.id}));

        expect(state3.isChildren[parent.id][block.id]).toBe(true);
        expect(state3.childrenOrder[parent.id]).toEqual([block.id]);
        expect(state3.findParent[block.id]).toEqual(parent.id);
    })
})
