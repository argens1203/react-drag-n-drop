type Props = {
    color?: string;
    style?: Record<string, any>;
    size?: number;
}

export function Square(props: Props) {
    const {color = 'grey', size = 100, style = {}} = props;
    return (
        <div style={{backgroundColor: color, height: size, width: size, ...style}}/>
    )
}