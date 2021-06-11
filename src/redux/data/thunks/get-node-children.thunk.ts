import {Dispatch} from "redux";
import {NodeDto} from "../../../module/node/entities/node.entity";
import {RelationshipApi} from "../../../api/relationships/get-relationship";
import {RelationshipDto} from "../../../module/relationships/entities/relationship.entity";
import {addLink} from "../data.slice";

export function getNodeChildren(node: NodeDto) {
    return (dispatch: Dispatch) => {
        return RelationshipApi
            .getRelationships(undefined, node.id)
            .then((r: RelationshipDto) => {
                dispatch(addLink({from: r.id, to: node.id}))
            }).catch(err => {
                console.log(err)
            });
    }
}