import React from "react";
import {useDrag} from "react-dnd";
import {BlockTransferData} from "../interfaces";
import {ItemTypes} from "../constants/item-types.const";

interface Style {
    style?: Record<string, any>
}

export function withDrag() {
    return function (InnerComponent: React.ComponentType) {
        return function (props: BlockTransferData & Style) {
            const {id} = props;
            const [, drag] = useDrag(() => ({
                type: ItemTypes.BLOCK,
                item: {id},
            }));
            return (
                <div ref={drag} style={props.style ?? {}}>
                    <InnerComponent/>
                </div>
            )
        }
    }
}
