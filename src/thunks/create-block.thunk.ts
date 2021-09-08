import {AppThunkDispatch} from "./thunk.type";
import {createNode} from "../middleware/nodes/api";
import {NodeEntity} from "../middleware/nodes/entities";
import {putBlock as putBlockAction} from "../middleware/nodes/slice";
import {getBlock} from "./get-block.thunk";

export function createBlock(){
    return async function (dispatch: AppThunkDispatch){
        await createNode()
            .then(res => NodeEntity.fromBackend(res)?.id)
            // .then(block => dispatch(putBlockAction(block)));
        dispatch(getBlock()); // TODO: Performance - need to splice this action <---
    }
}