import {putBlock, resetAll, setParent} from "../redux/data.slice";
import {getAllNodes, getRelationships} from "../api";
import {NodeEntity} from "../entities/node.entity";
import {RelationshipEntity} from "../entities/relationship.entity";
import {BackendRelationship} from "../api/types/relationship.type";
import {ROOT_ID} from "../redux/root-id.const";
import {AppDispatch} from "../redux/store";

async function injectRelationships(from: string): Promise<[string, BackendRelationship[]]>{
    const relationships: BackendRelationship[] = await getRelationships({from});
    return [from, relationships];
}

export function getBlock() {
    return async function (dispatch: AppDispatch) {
        dispatch(resetAll());
        const nodes = await getAllNodes();
        const ids: string[] = [];

        nodes.forEach((n) => {
            const entity = NodeEntity.fromBackend(n);
            if (entity) {
                ids.push(entity.id);
                dispatch(putBlock(entity))
            }
        })
        const relationships = await Promise.all(ids.map(injectRelationships))
        relationships.forEach(([from, rs]) => {
            let hasParent = false;
            rs.forEach((r: BackendRelationship) => {
                const entity = RelationshipEntity.fromBackend(r);
                if (entity) {
                    dispatch(setParent({child: from, parent: entity.to}))
                    hasParent = true;
                }
            })
            if (!hasParent) {
                dispatch(setParent({child: from, parent: ROOT_ID}))
            }
        })
    }
}