import {useSelector} from "react-redux";
import {RootState} from "../../../middleware/store/store";
import React, {ForwardedRef} from "react";
import {Hoverable} from "../../../components/hoverable/interfaces/hoverable.interface";
import {BlockTransferData} from "../interfaces";
import {Typography} from "@material-ui/core";

interface Props extends Hoverable, BlockTransferData {
}

export const BlockDisplay = React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const {id, hovered, canDrop} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const {title} = data;

    // const marginLeft = level * marginPerLevel;
    const backgroundColor = hovered && canDrop ? 'pink' : 'white';

    return (
        <div ref={ref} style={{
            borderLeft: `1px solid black`,
            backgroundColor,
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
        }}>
            <Typography style={{margin: 10}}>
                {title}
            </Typography>
        </div>
    )
});
