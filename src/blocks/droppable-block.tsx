import React from "react";
import {BlockDisplay} from "./block-display";
import {useDropzone} from "./hooks/use-dropzone.hook";
import { BlockData } from "./interfaces/block-data.interface";

export function DroppableBlock(props: BlockData) {
    const {id} = props;
    const [dropProps, drop] = useDropzone(id);
    const {hovered, canDrop} = dropProps || {};
    return (
        <BlockDisplay ref={drop} id={id} hovered={hovered} canDrop={canDrop}/>
    )
}