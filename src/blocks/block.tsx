import React, { createRef, useState } from "react";
import {useSelector} from "react-redux";
import {Box} from "@material-ui/core";
import {RootState} from "../redux/store";
import {ReorderSpacing} from "./reorder-spacing";
import {DroppableBlock} from "./droppable-block";
import {BlockDragHandle} from "./block-drag-handle";
import {BlockData} from './interfaces/block-data.interface';
import {useDrag} from "react-dnd";
import {ItemTypes} from "../drag/item-types.const";

export function Block(props: BlockData) {
    const {id} = props;
    const {color} = useSelector((state: RootState) => state.block.blocks[id]) || {};
    const childMap = useSelector((state: RootState) => state.block.isChildren[id]) || {};
    const childOrder = useSelector((state: RootState) => state.block.childrenOrder[id] || []);
    const children = childOrder.filter(id => childMap[id]);

    const ref = createRef<HTMLDivElement>()
    const [dragging, setDragging] = useState(false);
    const[startX,setStartX] = useState<null | number>(null);
    const[x, setX] = useState<null | number>(null);
    const onMouseDown = (e: any) => {
        setDragging(true);
        setStartX(e.clientX);
    };
    const onMouseMove = (e: any) => {
        if(dragging){
            setX(e.clientX);
        }
    };
    const onMouseUp = (e: any) =>{
        setDragging(false);
        setStartX(null);
        setX(null);
    }
    let translate = 0;
    if (x){
        if (startX){
            translate = startX - x;
            console.log(translate);
        }
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
                    <Box flexDirection={'row'} display={'flex'} alignItems={'center'} position={'relative'} style={{border: `1px solid ${color}`, transform: `translateX(-${translate}px)`}}>
                        <BlockDragHandle id={id}/>
                        <DroppableBlock id={id}/>
                    </Box>
                    <div style={{backgroundColor: 'pink', height: '100%', width: '100%', position: 'absolute', left: 0, top: 0, zIndex:-1}}/>
                </div>
            </Box>
            {children.map((id) => <Block key={id} id={id}/>)}
        </>
    )
}