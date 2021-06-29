import React, {createRef, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Box} from "@material-ui/core";
import {RootState} from "../redux/store";
import {ReorderSpacing} from "./reorder-spacing";
import {DroppableBlock} from "./droppable-block";
import {BlockDragHandle} from "./block-drag-handle";
import {BlockData} from './interfaces/block-data.interface';
import {useDrag} from "react-dnd";
import {ItemTypes} from "../drag/item-types.const";
import {DeletableBackground} from "./deletable-background";

export function Block(props: BlockData) {
    const {id} = props;
    const {color} = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
    const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
    const children = childOrder.filter(id => childMap[id]);
    const [width, setWidth] = useState<number | undefined>();
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        setWidth(ref.current?.offsetWidth);
    }, [ref.current])
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState<null | number>(null);
    const [x, setX] = useState<null | number>(null);

    let translate = 0;
    if (x) {
        if (startX) {
            translate = startX - x;
        }
    }

    let passedThreshold = false;
    if (translate && width) {
        passedThreshold = translate / width > 0.25;
    }

    const onMouseDown = (e: any) => {
        setDragging(true);
        setStartX(e.clientX);
    };
    const onMouseMove = (e: any) => {
        if (dragging) {
            setX(e.clientX);
        }
    };
    const onMouseUp = (e: any) => {
        setDragging(false);
        setStartX(null);
        setX(null);
    }

    return (
        <>
            <Box flexDirection={'column'} display={'flex'} flex={1} alignItems={'stretch'}>
                <ReorderSpacing id={id}/>
                <div ref={ref}
                     onMouseDown={onMouseDown}
                     onMouseMove={onMouseMove}
                     onMouseUp={onMouseUp}
                     onMouseLeave={onMouseUp}
                     style={{position: 'relative'}}>
                    <Box flexDirection={'row'} display={'flex'} alignItems={'center'} position={'relative'}
                         style={{border: `1px solid ${color}`, transform: `translateX(-${translate}px)`}}>
                        <BlockDragHandle id={id} style={{
                            backgroundColor: 'white',
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            display: 'flex'
                        }}/>
                        <DroppableBlock id={id}/>
                    </Box>
                    <DeletableBackground passedThreshold={passedThreshold}/>
                </div>
            </Box>
            {children.map((id) => <Block key={id} id={id}/>)}
        </>
    )
}