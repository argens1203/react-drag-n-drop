import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@material-ui/core";
import {RootState} from "../redux/store";
import {ReorderSpacing} from "./reorder-spacing";
import {DroppableBlock} from "./droppable-block";
import {BlockDragHandle} from "./block-drag-handle";
import {BlockData} from './interfaces/block-data.interface';
import {DragDeletable} from "../drag/drag-deletable";
import {marginPerLevel} from "./constants/margin-per-level.const";
import {deleteBlock} from "../thunks/delete-block.thunk";
import {IS_PARENT} from "../constants/relationship.const";

interface Props extends BlockData {
    level?: number;
}

export function Block(props: Props) {
    const {id, level = 0} = props;
    const dispatch = useDispatch();
    const childMap = useSelector((state: RootState) => state.relationship.lookup[IS_PARENT]?.[id]) || {};
    const childOrder = useSelector((state: RootState) => state.block.order || []);
    // const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
    const children = childOrder.filter(id => childMap[id]);

    const marginLeft = level * marginPerLevel;

    return (
        <>
            <Box flexDirection={'column'} display={'flex'} flex={1} alignItems={'stretch'}>
                <ReorderSpacing id={id}/>
                <DragDeletable style={{marginLeft}} onDelete={() => dispatch(deleteBlock(id))}>
                    <Box flexDirection={'row'} display={'flex'} alignItems={'center'} position={'relative'}
                         style={{border: `1px solid black`}}>
                        <BlockDragHandle id={id} style={{
                            backgroundColor: 'white',
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            display: 'flex',
                        }}/>
                        <DroppableBlock id={id}/>
                    </Box>
                </DragDeletable>
            </Box>
            {children.map((id) => <Block key={id} id={id} level={level + 1}/>)}
        </>
    )
}