import { Dispatch } from "@reduxjs/toolkit";
import { generate } from "short-uuid";
import { putBlock, setParent } from "../redux/data.slice";
import { ROOT_ID } from "../redux/root-id.const";

const initColors = ["red", "blue", "grey", "green", "yellow", "black"];

export function initBlock() {
  return function (dispatch: Dispatch) {
    const getBlock = (color: string) => ({
      id: generate(),
      color,
    });
    initColors.forEach((color) => {
      const block = getBlock(color);
      dispatch(putBlock(block));
      dispatch(setParent({ child: block.id, parent: ROOT_ID }));
    });
  };
}
