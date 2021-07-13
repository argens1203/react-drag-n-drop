import {getBlock} from "./get-block.thunk";
import {createNode, editNode} from "../api/nodes.api";
import {NodeEntity} from "../entities/node.entity";
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