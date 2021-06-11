import { NodeDto } from "../entities/node.entity"

export type IsoString = string

export enum Type {
    DUMP = 'dump'
}

export type Node = {
    _id: string,
    _created_at?: IsoString,
    _is_enabled?: boolean,
    _updated_at?: IsoString,
    type: Type
    _title?: string,
    preview?: string,
    data?: string
    _children?: Node[]
}

export type NodeComponentProps = {
    node: NodeDto
}