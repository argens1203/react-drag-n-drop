import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {setOrderBefore} from "./set-order-before.thunk";
import {setParent} from "./set-parent.thunk";
import {getParent} from "../utils/get-parent.action";

type Data = {
    target: string;
    before: string;
}

export function putBeforeAndSetSibling(data: Data) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const {target, before} = data;
        if (!target || !before) return;
        const state = getState();
        const parent = getParent(before, state);
        dispatch(setOrderBefore({target, before}));
        dispatch(setParent({parent, child: target}));
    }
}