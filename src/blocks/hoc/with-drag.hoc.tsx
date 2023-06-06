import React from "react";
import { useDrag } from "react-dnd";
import { BlockData } from "../interfaces/block-data.interface";
import { ItemTypes } from "../../drag/item-types.const";

interface Style {
  style?: Record<string, any>;
}

export function withDrag() {
  return function (InnerComponent: React.ComponentType) {
    return function (props: BlockData & Style) {
      const { id } = props;
      const [, drag] = useDrag(() => ({
        type: ItemTypes.BLOCK,
        item: { id },
      }));
      return (
        <div ref={drag} style={props.style ?? {}}>
          <InnerComponent />
        </div>
      );
    };
  };
}
