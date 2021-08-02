import React from "react";
import {BlockDisplay} from "./block-display";
import {useSetParentDropzone} from "../hooks/use-set-parent-dropzone.hook";
import { BlockTransferData } from "../interfaces";

export function BlockDroppable(props: BlockTransferData) {
    const {id} = props;
    const [dropProps, drop] = useSetParentDropzone(id);
    const {hovered, canDrop} = dropProps || {};
    return (
        <BlockDisplay ref={drop} id={id} hovered={hovered} canDrop={canDrop}/>
    )
}