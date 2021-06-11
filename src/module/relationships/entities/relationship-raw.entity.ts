import {ApiId} from "../../node/types/api.type";
import {RelationshipMeta} from "./relationship-meta.entity";

export class RelationshipRaw {
    from!: ApiId;
    to!: ApiId;
    meta!: RelationshipMeta;
}