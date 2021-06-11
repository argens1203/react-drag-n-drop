import {Type} from "class-transformer";
import {IsDefined, IsOptional, IsString, ValidateNested} from "class-validator";
import { NodeMeta } from "./node-meta.entity";

export class NodeRaw {
    @Type(() => NodeMeta)
    @ValidateNested()
    @IsDefined()
    meta!: NodeMeta;

    @IsString()
    @IsOptional()
    title?: string;
}