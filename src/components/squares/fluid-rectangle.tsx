import {Box} from "@material-ui/core";

export type Props = {
    color?: string;
    style?: Record<string, any>;
    height?: number;
}

export function FluidRectangle(props: Props) {
    const {color = 'grey', height = 100, style = {}} = props;
    return (
        <Box flex={1} style={{backgroundColor: color, height, width: 200, ...style}}/>
    )
}