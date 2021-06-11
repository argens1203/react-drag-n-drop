import {useState} from "react";
import {Button, Typography} from "@material-ui/core";

const debug = false;
const logger = t => {
    if (debug){
        console.log(t);
    }
}

export function PressableThing (props){
    const [text, setText] = useState('Default');
    const reset = ()=>setText('Default')
    // Release / Hitting Esc
    const onTouchEnd = e => {
        logger(e);
        setText('onTouchEnd');
    }
    const onTouchCancel = e => {
        logger(e);
        setText('onTouchCancel');
    }
    const onTouchMove = e => {
        logger(e);
        setText('onTouchMove');
    }
    const onTouchStart=(e)=>{
        logger(e);
        setText('onTouchStart')
    }
    return (
        <>
        <div style={{
            minHeight: 200,
            minWidth: 200,
            backgroundColor: 'lightBlue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
             id={'fun-thing'}
             onTouchStart={onTouchStart}
             onTouchEnd={onTouchEnd}
             onTouchMove={onTouchMove}
             onTouchCancel={onTouchCancel}
             draggable={"true"}
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