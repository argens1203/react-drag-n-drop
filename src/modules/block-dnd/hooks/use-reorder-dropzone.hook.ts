import {useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../constants/item-types.const";
import {BlockTransferData} from "../interfaces";
import {putBeforeAndSetSibling} from "../../../thunks";

export function useReorderDropzone(id: string) {
    const dispatch = useDispatch();
    return useDrop(() => ({
        accept: ItemTypes.BLOCK,
        drop: (item: BlockTransferData) => {
            dispatch(putBeforeAndSetSibling({target: item.id, before: id}));
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => item.id !== id,
    }));
}
