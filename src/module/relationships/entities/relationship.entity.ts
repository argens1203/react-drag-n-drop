import {ApiId} from "../../node/types/api.type";
import {RelationshipRaw} from "./relationship-raw.entity";

export class RelationshipDto {
    constructor(r: RelationshipRaw) {
        console.log(r);
        this.id = r.meta.id;
        this.from = r.from;
        this.to = r.to;
    }

    from: ApiId;
    to: ApiId;
    id: ApiId;
}