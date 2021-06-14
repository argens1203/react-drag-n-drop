import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {marginPerLevel} from "./constants/margin-per-level.const";
import {BlockData} from "./interfaces/block-data.interface";
import {useReorderDropzone} from "./hooks/use-reorder-dropzone.book";

export function ReorderSpacing(props: BlockData) {
    const {id} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const {level = 0} = data;
    const [collectedProps, ref] = useReorderDropzone(id);
    const {hovered, canDrop} = collectedProps;
    let backgroundColor = 'transparent';
    if (hovered && canDrop) {
        backgroundColor = 'green';
    }
    return (
        <div ref={ref} style={{
            height: 10, display: "flex", border: `1px solid ${data.color}`, backgroundColor: backgroundColor,
            marginLeft: marginPerLevel * level,
        }}/>
    )
}
