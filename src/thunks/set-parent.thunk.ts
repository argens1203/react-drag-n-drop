import {Dispatch} from '@reduxjs/toolkit';
import {setParent as setParentAction} from '../redux/data.slice';

type Data = {
    child: string;
    parent: string;
}

export function setParent(data: Data) {
    return function (dispatch: Dispatch) {
        const {child, parent} = data;
        dispatch(setParentAction({child, parent}));
    }
}