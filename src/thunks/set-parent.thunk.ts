import {Dispatch} from '@reduxjs/toolkit';
import {addRelationship} from "../redux/relationship/relationship.slice";
import {IS_PARENT} from "../constants/relationship.const";

type Data = {
    child: string;
    parent: string;
}

export function setParent(data: Data) {
    return async function (dispatch: Dispatch) {
        const {child, parent} = data;
        dispatch(addRelationship({from: parent, to: child, relationship: IS_PARENT}));
    }
}