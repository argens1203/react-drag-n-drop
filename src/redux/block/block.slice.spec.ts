import reducer, {editBlock, putBlock, removeBlock, setParent} from './block.slice';
import {initialBlockState} from "./initial-state.const";

// TODO: setup tests regarding combined reducer
// TODO: level is not really working when fiddling parents
// TODO: relationship depends a separate layer

describe('data slice', () => {
    const id = 'ID-Block';
    const color = 'red';
    const parentId = 'ID-Parent';
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

        it('should remove parent related detail when removing children', () => {
            const block = getBlock();
            const parent = getParent();

            let state = reducer(initialBlockState, putBlock(block));
            state = reducer(state, putBlock(parent));
            state = reducer(state, setParent({child: block.id, parent: parent.id}));

            state = reducer(state, removeBlock(block.id));

            expect(state.isChildren[parent.id][block.id]).toBe(false);
            expect(state.childrenOrder[parent.id]).toEqual([]);
            expect(state.findParent).not.toHaveProperty(block.id);
        })

        it.skip('should remove child related detail when removing parent', () => {
            const block = getBlock();
            const parent = getParent();

            let state = reducer(initialBlockState, putBlock(block));
            state = reducer(state, putBlock(parent));
            state = reducer(state, setParent({child: block.id, parent: parent.id}));

            state = reducer(state, removeBlock(parent.id));
            console.log(state);

            expect(state.isChildren).not.toHaveProperty(parent.id);
            expect(state.childrenOrder).not.toHaveProperty(parent.id);
            expect(state.findParent).not.toHaveProperty(block.id);
        })
    })

    it('should set parent', () => {
        const block = getBlock();
        const parent = getParent();
        let state = reducer(initialBlockState, putBlock(block));
        state = reducer(state, putBlock(parent));
        state = reducer(state, setParent({child: block.id, parent: parent.id}));

        expect(state.isChildren[parent.id][block.id]).toBe(true);
        expect(state.childrenOrder[parent.id]).toEqual([block.id]);
        expect(state.findParent[block.id]).toEqual(parent.id);
    })

})
