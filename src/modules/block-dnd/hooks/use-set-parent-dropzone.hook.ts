import {useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../constants/item-types.const";
import {BlockTransferData} from "../interfaces/block-transfer-data.interface";
import { setParent } from "../../../thunks";

export function useSetParentDropzone(id: string) {
    const dispatch = useDispatch();
    return useDrop(() => ({
        accept: ItemTypes.BLOCK,
        drop: (item: BlockTransferData) => {
            dispatch(setParent({child: item.id, parent: id}))
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item) => item.id !== id,
    }));
}
