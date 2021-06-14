import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {FluidRectangle} from "../squares/fluid-rectangle";
import {marginPerLevel} from "./margin-per-level.const";

export interface Hoverable {
    hovered: boolean;
    canDrop: boolean;
}

interface Props extends Hoverable {
    id: string;
}

export function BlockDisplay(props: Props) {
    const {id, hovered, canDrop} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const {color, level = 0} = data;
    const marginLeft = level * marginPerLevel;
    const opacity = hovered && canDrop ? 0.5 : 1;
    return (
        <FluidRectangle color={color} style={{marginLeft, opacity}}/>
    )
}