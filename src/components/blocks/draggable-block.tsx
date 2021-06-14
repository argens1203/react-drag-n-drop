import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import {BlockDisplay} from "./block-display";

type Props = {
  id: string;
  color?: string;
  hovered: boolean;
  canDrop: boolean;
}

export function DraggableBlock(props: Props) {
  const {id, hovered, canDrop} = props;
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {id},
  }));
  return (
    <div ref={drag} onClick={()=>{console.log(id)}}>
      <BlockDisplay id={id} hovered={hovered} canDrop={canDrop}/>
    </div>
  )
}