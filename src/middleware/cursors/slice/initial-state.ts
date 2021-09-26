import { CursorType } from "../enums";

const initialCursorLookup: {
    [parentId: string]: string;
} = {};

export const initialCursorState = {
    [CursorType.BACKWARD]: initialCursorLookup,
    [CursorType.FORWARD]: initialCursorLookup,
};

export type CursorSliceType = typeof initialCursorState;