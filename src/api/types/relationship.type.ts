import {Type} from "class-transformer";
import {BackendNodeMeta} from "./node.type";

class BackendRelationshipMeta extends BackendNodeMeta {
    rank?: number;
}

export class BackendRelationship {
    @Type(() => BackendRelationshipMeta)
    meta?: BackendRelationshipMeta;

    from?: string;

    to?: string;
}