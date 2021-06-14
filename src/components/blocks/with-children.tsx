import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {ReorderSpacing} from "../gaps/reorder-spacing";
import {Block, DroppableBlock} from "./droppable-block";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../drag/item-types.const";
import {DragIndicator} from "@material-ui/icons";
import {Box} from "@material-ui/core";

type Props = {
    id: string;
}

function withDrag() {
    return function (InnerComponent: React.ComponentType) {
        return function (props: Block) {
            const {id} = props;
            const [, drag] = useDrag(() => ({
                type: ItemTypes.BLOCK,
                item: {id},
            }));
            return (
                <div ref={drag} onClick={() => {
                    console.log(id)
                }}>
                    <InnerComponent/>
                </div>
            )
        }
    }
}

const Handle = withDrag()(DragIndicator)

export function BlockWithChildren(props: Props) {
    const {id} = props;
    const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
    const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
    const children = childOrder.filter(id => childMap[id]);

    return (
        <>
            <ReorderSpacing id={id}/>
            <Box flexDirection={'row'} display={'flex'} alignItems={'center'} position={'relative'} onClick={() => {
                console.log(id)
            }}>
                <Handle id={id}/>
                <DroppableBlock id={id}/>
            </Box>
            {children.map((id) => <BlockWithChildren key={id} id={id}/>)}
        </>
    )
}