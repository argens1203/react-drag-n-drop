import {NodeAction} from "./action";
import {NodeQuery} from "./query";
import {NodeRestful} from "./restful";

// export const NodeApi = {...NodeQuery, ...NodeAction, ...NodeRestful};

export class NodeApi {
    static Query = NodeQuery;
    static Action = NodeAction;
    static Restful = NodeRestful;
}