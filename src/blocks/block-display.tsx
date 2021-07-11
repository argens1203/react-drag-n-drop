import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {marginPerLevel} from "./constants/margin-per-level.const";
import React, {ForwardedRef} from "react";
import {Hoverable} from "./interfaces/hoverable.interface";
import {BlockData} from "./interfaces/block-data.interface";

interface Props extends Hoverable, BlockData {
}

export const BlockDisplay = React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const {id, hovered, canDrop} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const {color, level = 0} = data;

    // const marginLeft = level * marginPerLevel;
    const opacity = hovered && canDrop ? 0.5 : 1;

    return (
        <div ref={ref} style={{
            borderLeft: `1px solid ${color}`,
            backgroundColor: 'white',
            height: 100,
            flex: 1,
            // marginLeft,
            opacity
        }}/>
    )
})