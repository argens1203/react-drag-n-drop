import blockReducer, {editBlock, putBlock} from '../middleware/nodes/slice/block.slice';
import {initialBlockState} from "../middleware/nodes/slice";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {setOrderBefore} from "./set-order-before.thunk";
import * as editBlockThunk from "../middleware/nodes/thunks/edit-block.thunk";


declare global {
    namespace jest {
        interface Matchers<R> {
            toBeWithinRange(a: number, b: number): R;
        }
    }
}

// TODO: properly type this
expect.extend({
    toBeWithinRange(received, floor, ceiling){
        const pass = received >= floor  && received <= ceiling;
        if (pass){
            return {
                message: () => `exepected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                messsage: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});

describe('set order before thunk', () => {
    it('can set importance when "before" is at front of array', async () => {
        const importance = 2;
        let blockState = blockReducer(initialBlockState, putBlock({id: 'beforeId', importance}));
        blockState = blockReducer(blockState, putBlock({id: 'targetId', importance: 1}));

        const mockStore = configureMockStore([thunk]);
        const store = mockStore({block: blockState});
        const spied = jest.spyOn(editBlockThunk, 'editBlock');
        store.dispatch(setOrderBefore({target: 'targetId', before: 'beforeId'}));

        expect(spied).toBeCalledWith(expect.objectContaining({
            importance: expect.not.toBeWithinRange(0, 2),
            id: 'targetId',
        }));
    })
});