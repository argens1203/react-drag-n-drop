import {StyledSquare} from "./styled-square";
import {RootState} from "../../redux/store";
import {useSelector} from "react-redux";

type Props = {
  id: string;
  level?: number;
}

export function SquareWithChildren(props: Props) {
  const {id, level = 0} = props;
  const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
  const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
  const children = Object.entries(childMap).filter(([, v]) => !!v).map(([k]) => k);
  return (
    <>
      <StyledSquare level={level} id={id} {...data}/>
      {children.map((id)=><SquareWithChildren id={id} level={level + 1}/>)}
    </>
  )
}