import {Typography} from "@material-ui/core";
import {useState} from "react";

const debug = true;
export function DropZone(props){
    const {id} = props;
    const[text, setText] = useState('Drop Zone');

    const logger = (...args) => {
        if (debug) console.log(args);
    }

    const onDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        logger(id, e);
        setText('onDragEnter');
    }
    const onDragLeave = e => {
        logger(id, e);
        setText('onDragLeave');
    }
    const onDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        logger(id, e);
        setText('onDragOver');
    }

    const onDrop = e => {
        logger(id, e);
        setText('onDrop');
    }

    // Obsolete
    const onDragExit = e => {
        console.log(e);
        setText('onDragExit');
    }
    return (
        <div
            id={id}
            style={{
                minWidth: 200,
                minHeight: 200,
                backgroundColor: 'red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onDragLeave={onDragLeave}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragExit={onDragExit}
        >
            <Typography style={{
                cursor: 'disabled'
            }}>
                {text}
            </Typography>
        </div>
    )
}