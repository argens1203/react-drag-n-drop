import {putBlock} from "../redux/block/block.slice";
import {getAllNodes, getRelationships} from "../api";
import {NodeEntity} from "../entities/node.entity";
import {RelationshipEntity} from "../entities/relationship.entity";
import {BackendRelationship} from "../api/types/relationship.type";
import {ROOT_ID} from "../redux/block/root-id.const";
import {AppDispatch} from "../redux/store";
import {addRelationship, registerRelationship} from "../redux/relationship/relationship.slice";
import {IS_PARENT} from "../constants/relationship.const";
import {RelationshipType} from "../redux/relationship/relationship-type.enum";

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