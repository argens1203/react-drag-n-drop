import React from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import {BlockTransfer} from "../../drag/block-transfer.type";
import {setParent} from "../../redux/data.slice";
import {useDispatch} from "react-redux";
import {BlockDisplay, Hoverable} from "./block-display";

export interface Block {
    id: string;
}

function withDropzone(){
    return function (InnerComponent: React.ComponentType<Block & Hoverable>){
        return function (props: Block){
            const dispatch = useDispatch();
            const [dropProps, drop] = useDrop(() => ({
                accept: ItemTypes.BLOCK,
                drop: (item: BlockTransfer) => {
                    dispatch(setParent({child: item.id, parent: props.id}))
                },
                collect: (monitor) => ({
                    hovered: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                }),
                canDrop: (item) => item.id !== props.id,
            }));
            return (
                <div ref={drop}>
                    <InnerComponent {...dropProps} {...props}/>
                </div>
            )
        }
    }
}

export const DroppableBlock = withDropzone()(BlockDisplay);