import {AppThunkDispatch, AppThunkGetState} from "./thunk.type";
import {putBlock} from "../middleware/nodes/slice";
import {getRelationships} from "../middleware/relationships/api";
import {getNodes} from "../middleware/nodes/api";
import {NodeEntity} from "../middleware/nodes/entities";
import {RelationshipEntity} from "../middleware/relationships/entities";
import {BackendRelationship} from "../middleware/relationships/entities";
import {ROOT_ID} from "../middleware/nodes/constants";
import {addRelationship, registerRelationship} from "../middleware/relationships/slice";
import {IS_PARENT} from "../middleware/relationships/constants";
import {RelationshipType} from "../middleware/relationships/enums";
import { setCursor } from "../middleware/cursors/slice/cursor.slice";
import { CursorType } from "../middleware/cursors/enums";

async function injectRelationships(from: string): Promise<[string, BackendRelationship[]]> {
    const relationships: BackendRelationship[] = await getRelationships({from});
    return [from, relationships];
}

export function getAllBlocks() {
    return async function (dispatch: AppThunkDispatch, getState: AppThunkGetState) {
        const currentState = getState();
        const currentCursor = currentState.cursor.FORWARD[ROOT_ID];

        const {nodes, cursor} = await getNodes({cursor: currentCursor});
        dispatch(setCursor({type: CursorType.FORWARD, parent: ROOT_ID, cursor}));

        const ids: string[] = [];

        nodes.forEach((n) => {
            const entity = NodeEntity.fromBackend(n);
            if (entity) {
                ids.push(entity.id);
                dispatch(putBlock(entity));
            }
        })

        dispatch(registerRelationship({relationship: IS_PARENT, type: RelationshipType.ONE_TO_MANY}));
        const relationships = await Promise.all(ids.map(injectRelationships))
        relationships.forEach(([from, rs]) => {
            let hasParent = false;
            rs.forEach((r: BackendRelationship) => {
                const entity = RelationshipEntity.fromBackend(r);
                if (entity) {
                    dispatch(addRelationship({to: from, from: entity.to, relationship: IS_PARENT}))
                    hasParent = true;
                }
            })
            if (!hasParent) {
                dispatch(addRelationship({to: from, from: ROOT_ID, relationship: IS_PARENT}))
            }
        })
    }
}