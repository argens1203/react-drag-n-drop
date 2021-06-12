import {SquareProps} from "./types/square-props.type";

export function Square(props: SquareProps) {
    const {color = 'grey', size = 100, style = {}} = props;
    return (
        <div style={{backgroundColor: color, height: size, width: size, ...style}}/>
    )
}