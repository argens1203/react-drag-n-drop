import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import React, {ForwardedRef} from "react";
import {Hoverable} from "./interfaces/hoverable.interface";
import {BlockData} from "./interfaces/block-data.interface";
import {Typography} from "@material-ui/core";

interface Props extends Hoverable, BlockData {
}

export const BlockDisplay = React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const {id, hovered, canDrop} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const {title, level = 0} = data;

    // const marginLeft = level * marginPerLevel;
    const opacity = hovered && canDrop ? 0.5 : 1;

    return (
        <div ref={ref} style={{
            borderLeft: `1px solid black`,
            backgroundColor: 'white',
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            opacity
        }}>
            <Typography style={{margin: 10}}>
                {title}
            </Typography>
        </div>
    )
})