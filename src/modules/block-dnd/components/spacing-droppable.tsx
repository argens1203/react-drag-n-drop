import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../middleware/store/store";
import {marginPerLevel} from "../styles/margin-per-level.style";
import {BlockTransferData} from "../interfaces";
import {useReorderDropzone} from "../hooks/use-reorder-dropzone.hook";

interface Props extends BlockTransferData {
    level: number;
}

export function SpacingDroppable(props: Props) {
    const {id, level} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const [collectedProps, ref] = useReorderDropzone(id);
    const {hovered, canDrop} = collectedProps;
    let backgroundColor = 'transparent';
    if (hovered && canDrop) {
        backgroundColor = 'blue';
    }
    return (
        <div ref={ref} style={{
            height: 10,
            display: "flex",
            // border: `1px solid ${data.color}`,
            backgroundColor: backgroundColor,
            marginLeft: marginPerLevel * level,
        }}/>
    )
}
