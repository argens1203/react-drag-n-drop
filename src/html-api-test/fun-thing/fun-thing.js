import React, {useState} from "react";
import {Button, Typography} from "@material-ui/core";

export function FunThing (props){
    const [text, setText] = useState('Default');
    const reset = ()=>setText('Default')
    const onDrag = (e)=>{
        e.dataTransfer.setData('text/plain', text);
    }
    // Release / Hitting Esc
    const onDragEnd = e => {
        console.log(e);
        setText('onDragEnd');
    }
    const onDragStart = e => {
        console.log(e);
        setText('onDragStart');
    }
    const onDoubleClick = e => {
        console.log(e);
        setText('onDoubleClick');
    }
    const onClick=()=>{
        setText('onClick')
    }
    const onContextMenu = (e)=>{
        setText('onContextMenu')
    }
    return (
        <>
        <div style={{
            minHeight: 200,
            minWidth: 200,
            backgroundColor: 'grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
             id={'fun-thing'}
            onContextMenu={onContextMenu}
             onClick={onClick}
             onDrag={onDrag}
             onDragStart={onDragStart}
             onDragEnd={onDragEnd}
             draggable={"true"}
             onDoubleClick={onDoubleClick}
        >
            <Typography color={'white'}>
                {text}
            </Typography>
        </div>
            <Button onClick={reset}>
                reset
            </Button>
        </>
    );
}