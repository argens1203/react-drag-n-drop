import {getNode as api} from '../middleware/nodes/api'
import { NodeEntity } from '../middleware/nodes/entities';
import { putBlock } from '../middleware/nodes/slice';
import { AppThunkDispatch, AppThunkGetState } from './thunk.type';

export function getBlock(id: string){
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const node = await api(id);
        const entity = NodeEntity.fromBackend(node);
        if (entity) {
            dispatch(putBlock(entity));
        }
    }
}