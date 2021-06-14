import React from "react";
import {useSelector} from "react-redux";
import {Box} from "@material-ui/core";
import {RootState} from "../redux/store";
import {ReorderSpacing} from "../components/gaps/reorder-spacing";
import {DroppableBlock} from "./droppable-block";
import { BlockDragHandle } from "./block-drag-handle";
import {BlockData} from './interfaces/block-data.interface';

export function Block(props: BlockData) {
    const {id} = props;
    const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
    const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
    const children = childOrder.filter(id => childMap[id]);

    return (
        <>
            <Box flexDirection={'row'} display={'flex'} alignItems={'center'} position={'relative'}>
                <BlockDragHandle id={id}/>
                <Box flexDirection={'column'} display={'flex'} flex={1} alignItems={'stretch'}>
                    <ReorderSpacing id={id}/>
                    <DroppableBlock id={id}/>
                </Box>
            </Box>
            {children.map((id) => <Block key={id} id={id}/>)}
        </>
    )
}