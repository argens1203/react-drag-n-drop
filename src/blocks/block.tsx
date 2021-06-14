import React from "react";
import {useSelector} from "react-redux";
import {Box} from "@material-ui/core";
import {RootState} from "../redux/store";
import {ReorderSpacing} from "./reorder-spacing";
import {DroppableBlock} from "./droppable-block";
import {BlockDragHandle} from "./block-drag-handle";
import {BlockData} from './interfaces/block-data.interface';

export function Block(props: BlockData) {
    const {id} = props;
    const {color} = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
    const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
    const children = childOrder.filter(id => childMap[id]);

    return (
        <>
            <Box flexDirection={'column'} display={'flex'} flex={1} alignItems={'stretch'}>
                <ReorderSpacing id={id}/>
                <Box flexDirection={'row'} display={'flex'} alignItems={'center'} position={'relative'} style={{border: `1px solid ${color}`}}>
                    <BlockDragHandle id={id}/>
                    <DroppableBlock id={id}/>
                </Box>
            </Box>
            {children.map((id) => <Block key={id} id={id}/>)}
        </>
    )
}