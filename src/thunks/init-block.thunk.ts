import {Dispatch} from "@reduxjs/toolkit";
import {putBlock, resetAll, setParent} from "../redux/data.slice";
import {getAllNodes} from "../api/nodes.api";
import {NodeEntity} from "../entities/node.entity";
import {getRelationships} from "../api/relationships.api";
import {RelationshipEntity} from "../entities/relationship.entity";
import {BackendRelationship} from "../api/types/relationship.type";
import {ROOT_ID} from "../redux/root-id.const";

export function initBlock() {
    return async function (dispatch: Dispatch) {
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
        const relationships = await Promise.all(ids.map(async from => [from, await getRelationships({from})]))
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