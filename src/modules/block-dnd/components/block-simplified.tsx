import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import { NodeEntity } from "../../../middleware/nodes/entities";
import {RootState} from "../../../middleware/store/store";

type Props = {
    id: string;
}

export function BlockSimplified(props: Props){
    const {id} = props;
    const block: NodeEntity = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const {title, data} = block;
    if (!title && !data) return null;
    return (
        <Typography>
            {title ?? data}
        </Typography>
    )
}