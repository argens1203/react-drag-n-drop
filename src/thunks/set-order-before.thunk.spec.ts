import blockReducer, {editBlock, putBlock} from '../middleware/nodes/slice/block.slice';
import {initialBlockState} from "../middleware/nodes/slice";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {setOrderBefore} from "./set-order-before.thunk";

describe('set order before thunk', () => {
    it('can set importance when "before" is at front of array', () => {
        const importance = 2;
        let blockState = blockReducer(initialBlockState, putBlock({id: 'beforeId', importance}));
        blockState = blockReducer(blockState, putBlock({id: 'targetId', importance: 1}));

        const mockStore = configureMockStore([thunk]);
        const store = mockStore({block: blockState});
        store.dispatch(setOrderBefore({target: 'targetId', before: 'beforeId'}));

        expect(store.getActions()[0].payload.importance).toBeGreaterThan(importance);
        expect(store.getActions()).toHaveProperty([0, 'payload', 'id'], 'targetId');
    })
});