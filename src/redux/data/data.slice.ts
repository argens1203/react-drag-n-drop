import {createSlice} from "@reduxjs/toolkit";
import { NodeDto } from "../../module/node/entities/node.entity";
import {initialState} from "./data.const";
import {ApiId} from "../../module/node/types/api.type";

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        putNode: (state, action) => {
            const node: NodeDto = action.payload;
            state.nodes[node.id] = node;
        },
        removeNode: (state, action) => {
            const id: ApiId = action.payload;
            delete state.nodes[id];
        },
        setRoot: (state, action) => {
            state.root = action.payload;
        },
        addLink: (state, action) => {
            const {from, to} = action.payload;
            console.log("addingLink");
            if (!state.link[from]){
                state.link[from] = {};
            }
            if (!state.backlink[to]){
                state.backlink[to] = {};
            }
            state.link[from][to] = true;
            state.backlink[to][from] = true;
        },
        removeLink: (state, action) => {
            const {from, to} = action.payload;
            state.link[from][to] = false;
            state.backlink[to][from] = false;
        },
        setPreset: (state, action) => {
            const {title, _id} = action.payload;
            state.preset[title] = _id;
            console.log(state.preset);
        }
    }
});

export default dataSlice.reducer;
export const {putNode, removeNode, removeLink, addLink, setRoot, setPreset} = dataSlice.actions;
