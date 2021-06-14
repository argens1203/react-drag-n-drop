import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {ReorderSpacing} from "../gaps/reorder-spacing";
import {DraggableDroppableBlock} from "./draggable-droppable-block";

type Props = {
  id: string;
  level?: number;
}

export function BlockWithChildren(props: Props) {
  const {id, level = 0} = props;
  const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
  const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
  const children = childOrder.filter(id => childMap[id]);

  return (
    <>
      <ReorderSpacing id={id} level={level}/>
      <DraggableDroppableBlock id={id} level={level}/>
      {children.map((id)=><BlockWithChildren key={id} id={id} level={level + 1}/>)}
    </>
  )
}