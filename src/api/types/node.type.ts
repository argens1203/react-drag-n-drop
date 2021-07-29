import {Expose, Transform, Type} from "class-transformer";
import {IsDefined} from "class-validator";
import {DateTime} from 'luxon';
import {isoStringToDateTime} from "../transformers/iso-string-to-date-time.transformer";

export class BackendNodeMeta {
    constructor(param: Partial<BackendNodeMeta> = {}) {
        Object.assign(this, param);
    }

    @Expose({name: 'updated_at'})
    @Transform(isoStringToDateTime())
    updatedAt?: DateTime;

    @Expose({name: 'created_at'})
    @Transform(isoStringToDateTime())
    createdAt?: DateTime;

    @Expose({name: 'is_enabled'})
    isEnabled?: boolean;

    @IsDefined()
    id?: string;
}

export class BackendNode {
    constructor(param: Partial<BackendNode> = {}) {
        Object.assign(this, param);
    }

    @Type(() => BackendNodeMeta)
    meta?: BackendNodeMeta;

    title?: string;
}