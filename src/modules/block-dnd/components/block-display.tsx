import React, {ForwardedRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Input, Typography} from "@material-ui/core";
import {RootState} from "../../../middleware/store/store";
import {Hoverable} from "../../../components/hoverable/interfaces";
import {BlockTransferData} from "../interfaces";
import {editBlock} from "../../../middleware/nodes/thunks";

interface Props extends Hoverable, BlockTransferData {
}

export const BlockTitleDisplay = React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const {id, hovered, canDrop} = props;
    const block = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const dispatch = useDispatch();
    const {title, data} = block;

    const backgroundColor = hovered && canDrop ? 'pink' : 'white';

    const onBlur = (value?: string) => {
        dispatch(editBlock({id, title: value}));
    }

    return (
        <div ref={ref}
             style={{
                 borderLeft: `1px solid black`,
                 backgroundColor,
                 flex: 1,
                 display: 'inline-flex',
                 alignItems: 'center',
                 flexDirection: 'column',
             }}>
            <Input
                disableUnderline={true}
                style={{margin: 10}}
                defaultValue={title}
                fullWidth={true}
                placeholder={"untitled"}
                onBlur={e => onBlur(e?.target?.value)}
            />
            {/* <div style={{
                alignSelf: 'stretch'
            }}>
                <Typography>{data}</Typography>
            </div> */}
        </div>
    )
});
