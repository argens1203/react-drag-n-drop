import {Dispatch} from '@reduxjs/toolkit';
import {putBeforeAndSetSibling as putBeforeAndSetSiblingAction} from '../redux/data.slice';

type Data = {
    target: string;
    before: string;
}

export function putBeforeAndSetSibling(data: Data) {
    return async function (dispatch: Dispatch) {
        dispatch(putBeforeAndSetSiblingAction(data));
    }
}