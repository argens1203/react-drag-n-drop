import React from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import {BlockTransfer} from "../../drag/block-transfer.type";
import {putBeforeAndSetSibling} from "../../redux/data.slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import { marginPerLevel } from "../blocks/margin-per-level.const";

export type Props = {
    id: string;
    level?: number;
};

export function ReorderSpacing(props: Props) {
    const {id, level = 0} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const dispatch = useDispatch();
    const [collectedProps, reorderDrop] = useDrop(() => ({
        accept: ItemTypes.BLOCK,
        drop: (item: BlockTransfer) => {
            dispatch(putBeforeAndSetSibling({target: item.id, before: id}));
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => item.id !== id,
    }));
    const {hovered, canDrop} = collectedProps;
    let backgroundColor = 'transparent';
    if (hovered && canDrop) {
        backgroundColor = 'green';
    }
    return (
        <div ref={reorderDrop} style={{
            height: 10, display: "flex", border: `1px solid ${data.color}`, backgroundColor: backgroundColor,
            marginLeft: marginPerLevel * level,
        }}/>
    )
}
