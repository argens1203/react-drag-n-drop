import {getBlock} from "./get-block.thunk";
import {createNode, editNode} from "../middleware/nodes/api";
import {NodeEntity} from "../middleware/nodes/entities";
import { AppThunkDispatch } from "./thunk.type";

const titles = ['from', 'to'];

export function initBlock() {
    return async function (dispatch: AppThunkDispatch) {
        await Promise.all(titles.map(async (title) => {
            return await createNode()
                .then(res => NodeEntity.fromBackend(res)?.id)
                .then(async (id) => {
                    if (id) {
                        await editNode(id, {title})
                    }
                })
        }))
        dispatch(getBlock());
    }
}