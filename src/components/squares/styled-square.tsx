import {Square} from "./square";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";

type Props = {
  id: string;
  color?: string;
  level: number;
}

const marginPerLevel = 10;

export function StyledSquare(props: Props) {
  const {id, color, level} = props;
  const marginLeft = level * marginPerLevel;
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {id}
  }));
  return (
    <div ref={drag} onClick={()=>{console.log(id)}}>
      <Square color={color} style={{marginLeft}}/>
    </div>
  )
}