import { title } from "process";
import { AppThunkDispatch } from "./thunk.type";
import { getNode } from "../middleware/nodes/api";
import { NodeEntity } from "../middleware/nodes/entities";
import { putBlock } from "../middleware/nodes/slice";
import { getRelationships } from "../middleware/relationships/api";
import { IS_PARENT } from "../middleware/relationships/constants";
import { BackendRelationship, RelationshipEntity } from "../middleware/relationships/entities";
import { addRelationship } from "../middleware/relationships/slice";
import {getChildren as api} from '../middleware/combined/api';
import { format } from "path";

export function getChildren(parentId: string){
    return async function (dispatch: AppThunkDispatch) {
        const {links, nodes} = await api(parentId);
        nodes.forEach((n) => {
            if (n){
                const entity = NodeEntity.fromBackend(n);
                if (entity){
                    dispatch(putBlock(entity));
                }
            }
        });
        links.forEach((l) => {
            if (l){
                const entity = RelationshipEntity.fromBackend(l);
                if (entity){
                    console.log(entity);
                    const {to, from} = entity;
                    dispatch(addRelationship({from: to, to: from, relationship: IS_PARENT}));
                }
            }
        });
    }
}