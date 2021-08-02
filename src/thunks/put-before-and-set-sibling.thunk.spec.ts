import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {initialRelationshipState} from "../redux/relationship/initial-state.const";
import {putBeforeAndSetSibling} from "./put-before-and-set-sibling.thunk";
import {initialBlockState} from "../redux/block/initial-state.const";
import blockReducer, {putBlock} from "../redux/block/block.slice";
import relationshipReducer, {
    addRelationship,
    registerRelationship,
} from "../redux/relationship/relationship.slice";
import {IS_PARENT} from "../constants/relationship.const";
import {RelationshipType} from "../redux/relationship/relationship-type.enum";
import * as setOrderBeforeThunk from "./set-order-before.thunk";
import * as setParentThunk from "./set-parent.thunk";

describe('put before and set sibling thunk', () => {
    it('should set parent and set order', () =>{
        let blockState = blockReducer(initialBlockState, putBlock({id: 'before', importance: 1}));
        blockState = blockReducer(blockState, putBlock({id: 'target', importance: 2}));
        blockState = blockReducer(blockState, putBlock({id: 'parent', importance: 0}));

        let relationshipState = relationshipReducer(initialRelationshipState, registerRelationship({relationship: IS_PARENT, type: RelationshipType.TREE}));
        relationshipState = relationshipReducer(relationshipState, addRelationship({from: 'parent', to: 'before', relationship: IS_PARENT}))

        const mockStore = configureMockStore([thunk]);
        const store = mockStore({relationship: relationshipState, block: blockState});
        const spiedSetOrder = jest.spyOn(setOrderBeforeThunk, 'setOrderBefore');
        const spiedSetParent = jest.spyOn(setParentThunk, 'setParent');

        store.dispatch(putBeforeAndSetSibling({target: 'target', before: 'before'}));
        expect(spiedSetOrder).toBeCalledTimes(1);
        expect(spiedSetParent).toBeCalledTimes(1);
    })
});
