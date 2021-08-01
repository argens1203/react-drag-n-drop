import thunk from "redux-thunk";
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import {initialBlockState} from "../redux/block/initial-state.const";
import {initialRelationshipState} from "../redux/relationship/initial-state.const";
import {setParent} from "./set-parent.thunk";
import {addRelationship, registerRelationship, removeRelationship} from "../redux/relationship/relationship.slice";
import {IS_PARENT} from "../constants/relationship.const";
import relationshipReducer from "../redux/relationship/relationship.slice";
import {child} from "winston";
import {RelationshipType} from "../redux/relationship/relationship-type.enum";

describe('set parent', () => {
    it('should set parent correctly', () => {
        const childId = '1';
        const parentId = '2';
        const mockStore = configureMockStore([thunk]);
        const store = mockStore({relationship: initialRelationshipState});

        store.dispatch(setParent({child: childId, parent: parentId}));
        expect(store.getActions()).toContainEqual(addRelationship({from: parentId, to: childId, relationship: IS_PARENT}))
    });

    it('should unset previous parent', () => {
        const childId = 'childId';
        const parentId = 'parentId';

        const mockStore = configureMockStore([thunk]);
        const store = mockStore({relationship: initialRelationshipState});
        store.dispatch(setParent({child: childId, parent: parentId}));

        expect(store.getActions()).toContainEqual(removeRelationship({to: childId, relationship: IS_PARENT}));
        expect(store.getActions()).toContainEqual(addRelationship({from: parentId, to: childId, relationship: IS_PARENT}));
    })
})