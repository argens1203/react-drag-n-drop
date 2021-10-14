import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {putBlock, saveBlock} from "../middleware/nodes/slice";
import {getNodeByTitle} from "../middleware/nodes/api";
import {NodeEntity} from "../middleware/nodes/entities";
import {registerRelationship} from "../middleware/relationships/slice";
import {IS_PARENT} from "../middleware/relationships/constants";
import {RelationshipType} from "../middleware/relationships/enums";
import {getChildren} from './get-children.thunk';

export function getBlockWithTitle(title: string) {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const node = await getNodeByTitle(title);
        dispatch(registerRelationship({relationship: IS_PARENT, type: RelationshipType.ONE_TO_MANY}));
        if (!node){
            return;
        }
        const nodeEntity = NodeEntity.fromBackend(node);
        if (!nodeEntity){
            return;
        }
        dispatch(saveBlock(nodeEntity));
        dispatch(putBlock(nodeEntity));
        dispatch(getChildren(nodeEntity.id));
    }
}