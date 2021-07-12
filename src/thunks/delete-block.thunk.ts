import {Dispatch} from "@reduxjs/toolkit";
import {removeBlock as removeBlockAction} from '../redux/data.slice';

export function deleteBlock(id: string) {
    return function (dispatch: Dispatch) {
        dispatch(removeBlockAction(id));
    }
}