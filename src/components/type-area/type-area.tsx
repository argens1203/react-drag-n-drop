import {Input, TextField, Typography} from '@material-ui/core';
import React, {useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {createNew} from "../../redux/data";

export function TypeArea() {
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onClick = () => {
        setClicked(true);
        if (inputRef.current){
            inputRef.current.focus();
        }
    };
    return (
        <div style={{
            border: '1px solid black',
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
             onClick={onClick}
        >
            {clicked ? (
                <TextField
                    inputRef={inputRef}
                    autoFocus
                    onKeyUp={e => {
                        if (e.code === "Enter") {
                            setValue('');
                            dispatch(createNew(value));
                        }
                    }}
                    autoSave={"true"}
                    value={value}
                    onChange={e => {
                        setValue(e.target.value);
                    }
                    }/>
            ) : null}
        </div>
    )
}