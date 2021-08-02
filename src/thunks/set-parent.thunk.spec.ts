import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import {initialRelationshipState, registerRelationship, relationshipReducer} from "../middleware/relationships/slice";
import {setParent} from "./set-parent.thunk";
import {addRelationship, removeRelationship} from "../middleware/relationships/slice";
import {IS_PARENT} from "../middleware/relationships/constants";
import {RelationshipType} from "../middleware/relationships/enums";

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

    it('should upgrade child to attach to grandparent if cyclic', () => {
        const grandparent = 'gp';
        const parent = 'p';
        const child = 'c';

        let state = relationshipReducer(initialRelationshipState, registerRelationship({relationship: IS_PARENT, type: RelationshipType.TREE}));
        state = relationshipReducer(state, addRelationship({from: grandparent, to: parent, relationship: IS_PARENT}));
        state = relationshipReducer(state, addRelationship({from: parent, to: child, relationship: IS_PARENT}));

        const store = configureMockStore([thunk])({relationship: state});
        store.dispatch(setParent({child: parent, parent: child}));

        expect(store.getActions()).toContainEqual(removeRelationship({from: parent, to: child, relationship: IS_PARENT}));
        expect(store.getActions()).toContainEqual(addRelationship({from: grandparent, to: child, relationship: IS_PARENT}));
        expect(store.getActions()).toContainEqual(removeRelationship({to: parent, relationship: IS_PARENT}));
        expect(store.getActions()).toContainEqual(addRelationship({from: child, to: parent, relationship: IS_PARENT}));
    })
})