import {Square} from "./square";

type Props = {
  id: string;
  color?: string;
  level: number;
}

const marginPerLevel = 10;

export function StyledSquare(props: Props) {
  const {id, color, level} = props;
  const marginLeft = level * marginPerLevel;
  return (
    <div onClick={()=>{console.log(id)}}>
      <Square color={color} style={{marginLeft}}/>
    </div>
  )
}