import {ApiId} from "../types/api.type";
import {NodeRaw} from "./node-raw.entity";

export class NodeDto {
    constructor(njs: NodeRaw) {
        this.id = njs.meta.id;
        this.title = njs.title;
    }

    setChildren(child: NodeDto) {
        this.children.push(child);
        return this;
    }

    id: ApiId;
    title?: string;
    children: NodeDto[] = [];
    preview?: string;
    data?: any;
}