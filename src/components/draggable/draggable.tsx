import React, {DragEventHandler, ReactNode} from "react";

type DraggableProps = {
  onDragStart?: DragEventHandler<HTMLDivElement>;
  onDragEnd?: DragEventHandler<HTMLDivElement>;
  onDrag?: DragEventHandler<HTMLDivElement>;
  enabled?: boolean;
  children?: ReactNode
}

export function Draggable(props: DraggableProps) {
  const {onDragStart, onDragEnd, onDrag, enabled = true} = props;
  return (
    <div
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={enabled ? "true" : false}>
      {props.children}
    </div>
  )
}