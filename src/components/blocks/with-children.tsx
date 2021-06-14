import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {ReorderSpacing} from "../gaps/reorder-spacing";
import {DraggableDroppableBlock} from "./draggable-droppable-block";

type Props = {
  id: string;
}

export function BlockWithChildren(props: Props) {
  const {id} = props;
  const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
  const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
  const children = childOrder.filter(id => childMap[id]);

  return (
    <>
      <ReorderSpacing id={id}/>
      <DraggableDroppableBlock id={id}/>
      {children.map((id)=><BlockWithChildren key={id} id={id}/>)}
    </>
  )
}