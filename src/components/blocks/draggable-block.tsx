import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import { Block } from "./block";
import { marginPerLevel } from "./margin-per-level.const";

type Props = {
  id: string;
  color?: string;
  level: number;
  hovered: boolean;
  canDrop: boolean;
}

export function DraggableBlock(props: Props) {
  const {id, color, level, hovered, canDrop} = props;
  const marginLeft = level * marginPerLevel;
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {id},
  }));
  return (
    <div ref={drag} onClick={()=>{console.log(id)}}>
      <Block color={color} style={{marginLeft, opacity: (hovered && canDrop) ? 0.5 : 1}}/>
    </div>
  )
}