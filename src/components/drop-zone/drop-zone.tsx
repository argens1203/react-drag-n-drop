import React, {DragEventHandler, ReactNode, useState} from "react";
import {DropEffect} from "./drop-effect.enum";

type DropZoneProps = {
  type?: DropEffect,
  onDragEnter?: DragEventHandler,
  onDragLeave?: DragEventHandler,
  onDragOver?: DragEventHandler,
  onDrop?: DragEventHandler,
  children?: ReactNode
}

export function DropZone(props: DropZoneProps) {
  const {type = DropEffect.MOVE} = props;

  const [opacity, setOpacity] = useState(100);
  const {
    onDragEnter = () => {
    },
    onDragLeave = () => {
      setOpacity(100);
    },
    onDragOver = () => {
      setOpacity(20);
    },
    onDrop = () => {
    }
  } = props;

  const _onDragEnter: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    onDragEnter(e);
  };
  const _onDragOver: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = type;
    onDragOver(e);
  };
  const _onDragLeave = onDragLeave;
  const _onDrop = onDrop;

  return (
    <div
      onDrop={_onDrop}
      onDragLeave={_onDragLeave}
      onDragOver={_onDragOver}
      onDragEnter={_onDragEnter}
      style={{opacity}}
    >
      {props.children}
    </div>
  );
}