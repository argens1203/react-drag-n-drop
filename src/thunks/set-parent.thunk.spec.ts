import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import {initialRelationshipState} from "../middleware/relationships/constants/initial-state.const";
import {setParent} from "./set-parent.thunk";
import {addRelationship, removeRelationship} from "../middleware/relationships/slices/relationship.slice";
import {IS_PARENT} from "../middleware/relationships/constants/relationship.const";

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
    });
})