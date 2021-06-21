import React from "react";
import {Delete} from "@material-ui/icons";

export function DeletableBackground() {
    return (
        <div style={{
            backgroundColor: 'pink',
            height: '100%',
            width: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: -1,
            display:'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        }}
        >
            <Delete/>
        </div>
    )
}
