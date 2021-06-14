import {DraggableBlock} from "./draggable-block";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import {BlockTransfer} from "../../drag/block-transfer.type";
import {setParent} from "../../redux/data.slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";

type Props = {
    id: string;
    level: number;
}

export function DraggableDroppableBlock (props: Props){
    const {id, level} = props;
    const data = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const dispatch = useDispatch();
    const [dropProps, drop] = useDrop(() => ({
        accept: ItemTypes.BLOCK,
        drop: (item: BlockTransfer) => {
            dispatch(setParent({child: item.id, parent: id}))
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => item.id !== id,
    }));
    return (
        <div ref={drop}>
            <DraggableBlock level={level} id={id} {...data} {...dropProps}/>
        </div>
    )
}