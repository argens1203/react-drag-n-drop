import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {marginPerLevel} from "./margin-per-level.const";
import React, {ForwardedRef} from "react";

export interface Hoverable {
    hovered: boolean;
    canDrop: boolean;
}

interface Props extends Hoverable {
    id: string;
}

export const BlockDisplay = React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const {id, hovered, canDrop} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const {color, level = 0} = data;
    const marginLeft = level * marginPerLevel;
    const opacity = hovered && canDrop ? 0.5 : 1;
    const flex =1;
    return (
        <div ref={ref} style={{backgroundColor: color, height: 100, width: 200, marginLeft, opacity, flex}}/>
    )
})