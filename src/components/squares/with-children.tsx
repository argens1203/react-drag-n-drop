import {StyledSquare} from "./styled-square";
import {RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import {BlockTransfer} from "../../drag/block-transfer.type";
import {setParent} from "../../redux/data.slice";

type Props = {
  id: string;
  level?: number;
}

export function SquareWithChildren(props: Props) {
  const {id, level = 0} = props;
  const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
  const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
  const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
  const children = childOrder.filter(id => childMap[id]);

  const dispatch = useDispatch();
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {id}
  }));
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item: BlockTransfer) => {
      dispatch(setParent({child: item.id, parent: id}))
    }
  }));

  return (
    <>
      <div ref={drop}>
        <div ref={drag}>
      <StyledSquare level={level} id={id} {...data}/>
        </div>
      </div>
      {children.map((id)=><SquareWithChildren key={id} id={id} level={level + 1}/>)}
    </>
  )
}