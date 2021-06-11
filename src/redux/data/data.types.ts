import {Node} from "../../module/node/types/node.type"
import {NodeDto} from "../../module/node/entities/node.entity";

export type NodeLookup = {
    [key: string]: NodeDto
}

export type DoubleIdLookup = {
    [key: string]: {
        [key: string]: boolean
    }
}

export type IdLookup = {
    [key: string]: string
}

export type InitialState = {
    nodes: NodeLookup,
    link: DoubleIdLookup,
    backlink: DoubleIdLookup,
    root: string | null,
    preset: IdLookup
}