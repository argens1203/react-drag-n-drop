import {DoubleIdLookup, IdLookup, InitialState, NodeLookup} from "./data.types";

const nodes: NodeLookup = {};
const link: DoubleIdLookup = {};
const backlink: DoubleIdLookup = {};
const preset: IdLookup = {};

export const initialState: InitialState = {
    nodes,
    link,
    backlink,
    root: null,
    preset
}