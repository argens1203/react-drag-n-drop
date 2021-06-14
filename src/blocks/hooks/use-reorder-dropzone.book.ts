import {useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import {BlockTransfer} from "../../drag/block-transfer.type";
import {putBeforeAndSetSibling} from "../../redux/data.slice";

export function useReorderDropzone(id: string) {
    const dispatch = useDispatch();
    return useDrop(() => ({
        accept: ItemTypes.BLOCK,
        drop: (item: BlockTransfer) => {
            dispatch(putBeforeAndSetSibling({target: item.id, before: id}));
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => item.id !== id,
    }));
}
