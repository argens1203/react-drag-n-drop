import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {editBlock} from "../middleware/nodes/slice/block.slice";

type Data = {
    target: string;
    before: string;
}

export function setOrderBefore(data: Data) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {target, before} = data;
        if (!target || !before) return;
        const state = getState();
        const next = state.block.blocks[before].importance;
        const idx = state.block.order.indexOf(before);
        const prev = idx === 0 ? next + 1 : state.block.blocks[state.block.order[idx - 1]].importance;
        dispatch(editBlock({id: target, importance: (next + prev) / 2}))
    }
}