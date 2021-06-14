import React from "react";
import {useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {ItemTypes} from "../../drag/item-types.const";
import {BlockTransfer} from "../../drag/block-transfer.type";
import {setParent} from "../../redux/data.slice";
import {BlockDisplay, Hoverable} from "./block-display";

export interface Block {
    id: string;
}

function useDropzone(id: string) {
    const dispatch = useDispatch();
    return useDrop(() => ({
        accept: ItemTypes.BLOCK,
        drop: (item: BlockTransfer) => {
            dispatch(setParent({child: item.id, parent: id}))
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => item.id !== id,
    }));
}

export function DroppableBlock(props: Block) {
    const {id} = props;
    const [dropProps, drop] = useDropzone(id);
    const {hovered, canDrop} = dropProps || {};
    return (
        <BlockDisplay ref={drop} id={id} hovered={hovered} canDrop={canDrop}/>
    )
}