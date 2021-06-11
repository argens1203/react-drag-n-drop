import {Dispatch} from "redux";
import {Node} from "../../module/node/types/node.type"
import {addLink, putNode, setPreset, setRoot} from "./data.slice";
import {NodeApi} from "../../api/node";
import {Type} from "../../module/node/types/node.type";
import {PresetApi} from "../../api/presets";
import {NodeDto} from "../../module/node/entities/node.entity";
import {RelationshipApi} from "../../api/relationships/get-relationship";
import {RelationshipDto} from "../../module/relationships/entities/relationship.entity";

export function grabAll() {
    return (dispatch: Dispatch) => {
        return NodeApi.Query.getAll().then((nodes: NodeDto[]) => {
            nodes.forEach((n) => {
                dispatch(putNode(n));
            })
        })
    }
}

export function createNew(oneLine: string) {
    return (dispatch: Dispatch) => {
        return NodeApi.Restful.createNode()
            .then(node => {
                return NodeApi.Restful.editNode(node.id, {
                    title: oneLine,
                    type: Type.DUMP
                })
            })
            .then((node) => {
                dispatch(putNode(node));
            }).catch(err => {
                console.error(err);
            })
    }
}

type SetParentInput = { child: string, parent: string };

export function setParent(input: SetParentInput) {
    const {child, parent} = input;
    return async (dispatch: Dispatch) => {
        await NodeApi.Action.setParent({
            from: child,
            to: parent,
            target: null
        }).then(res => {
            dispatch(addLink({from: child, to: parent}));
        }).catch(e => {
            console.log(e);
        })
        return;
    }
}

export function createPreset() {
    return (dispatch: Dispatch) => {
        return PresetApi.Action.create()
            .then(nodes => {
                nodes.forEach((node: Node) => {
                    dispatch(putNode(node));
                })
            })
    }
}

export function getPreset() {
    return (dispatch: Dispatch) => {
        return PresetApi.Query.getAll()
            .then(nodes => {
                nodes.forEach((n: NodeDto) => {
                    dispatch(putNode(n));
                    if (n.title === "root") {
                        dispatch(setRoot(n.id));
                    }
                    dispatch(setPreset({title: n.title, id: n.id}));

                });
                return nodes;
            })
            .then(nodes => {
                nodes.forEach((n: NodeDto) => {
                    RelationshipApi
                        .getRelationships(undefined, n.id)
                        .then((rs: RelationshipDto[]) => {
                            rs.forEach(r => dispatch(addLink({from: r.from, to: r.to})))
                        });
                })
            })
    }
}