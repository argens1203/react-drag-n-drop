import {Dispatch} from "@reduxjs/toolkit";
import {removeBlock as removeBlockAction} from '../redux/block/block.slice';
import {removeNode} from "../api";

export function deleteBlock(id: string) {
    return async function (dispatch: Dispatch) {
        return await removeNode(id).then(() => {
            dispatch(removeBlockAction(id));
        });
    }
}