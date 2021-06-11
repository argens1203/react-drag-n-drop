import { ApiId } from "../types/api.type";

export class NodeMeta {
    created_at!: string;
    is_enabled!: boolean;
    id!: ApiId;
    updated_at!: string;
}
