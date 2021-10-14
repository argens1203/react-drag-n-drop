import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@material-ui/core";
import {RootState} from "../../../middleware/store/store";
import {SpacingDroppable} from "./spacing-droppable";
import {BlockDroppable} from "./block-droppable";
import {BlockDragHandle} from "./block-drag-handle";
import {BlockTransferData} from '../interfaces';
import {DragDeletable} from "../../../components/drag-deletable";
import {marginPerLevel} from "../styles/margin-per-level.style";
import {deleteBlock} from "../../../thunks";
import {IS_PARENT} from "../../../middleware/relationships/constants";
import {BlockExpandHandle} from './block-expand-handle';
import {BlockGoHandle} from './block-go-handle';

interface Props extends BlockTransferData {
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
                <SpacingDroppable id={id} level={level}/>
                <DragDeletable style={{marginLeft}} onDelete={() => dispatch(deleteBlock(id))}>
                    <Box flexDirection={'row'} display={'flex'} alignItems={'center'} position={'relative'}
                         style={{border: `1px solid black`}}>
                        <BlockDragHandle id={id} style={{
                            backgroundColor: 'white',
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            display: 'flex',
                        }}/>
                        <BlockDroppable id={id}/>
                        <BlockExpandHandle id={id}/>
                        <BlockGoHandle id={id}/>
                    </Box>
                </DragDeletable>
            </Box>
            {children.map((id) => <Block key={id} id={id} level={level + 1}/>)}
        </>
    )
}