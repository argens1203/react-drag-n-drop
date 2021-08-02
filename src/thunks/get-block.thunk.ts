import {putBlock} from "../middleware/nodes/slice";
import {getRelationships} from "../middleware/relationships/api";
import {getAllNodes} from "../middleware/nodes/api";
import {NodeEntity} from "../middleware/nodes/entities";
import {RelationshipEntity} from "../middleware/relationships/entities";
import {BackendRelationship} from "../middleware/relationships/entities";
import {ROOT_ID} from "../middleware/nodes/constants";
import {AppDispatch} from "../middleware/store/store";
import {addRelationship, registerRelationship} from "../middleware/relationships/slice";
import {IS_PARENT} from "../middleware/relationships/constants";
import {RelationshipType} from "../middleware/relationships/enums";

async function injectRelationships(from: string): Promise<[string, BackendRelationship[]]> {
    const relationships: BackendRelationship[] = await getRelationships({from});
    return [from, relationships];
}

export function getBlock() {
    return async function (dispatch: AppDispatch) {
        const nodes = await getAllNodes();
        const ids: string[] = [];

        nodes.forEach((n) => {
            const entity = NodeEntity.fromBackend(n);
            if (entity) {
                ids.push(entity.id);
                dispatch(putBlock(entity))
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