import {Dispatch} from '@reduxjs/toolkit';
import {setParent as setParentAction} from '../redux/block/block.slice';
import {createRelationship} from "../api";

type Data = {
    child: string;
    parent: string;
}

export function setParent(data: Data) {
    return async function (dispatch: Dispatch) {
        const {child, parent} = data;
        dispatch(setParentAction({child, parent}));
        // TODO: different relationship?
        // await createRelationship(child, parent)
        //     .then((res) => {
        //         dispatch(setParentAction({child, parent}));
        //     })
    }
}