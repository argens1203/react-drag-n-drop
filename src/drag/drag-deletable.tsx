import React, {createRef, useEffect, useState} from "react";
import {useDragHook} from "./custom-drag.hook";
import {DeletableBackground} from "../blocks/deletable-background";

type Props = {
    children: React.ReactNode;
}

export function DragDeletable(props: Props) {
    const [listeners, dragContext] = useDragHook();
    const {onMouseDown, onMouseUp, onMouseMove} = listeners;
    const {start, current} = dragContext;

    const [width, setWidth] = useState<number | undefined>();
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        setWidth(ref.current?.offsetWidth);
    }, [ref, ref.current])

    let translate = 0;
    if (current) {
        if (start) {
            translate = start - current;
        }
    }

    let passedThreshold = false;
    if (translate && width) {
        passedThreshold = translate / width > 0.25;
    }

    return (
        <div ref={ref}
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
             onMouseUp={onMouseUp}
             onMouseLeave={onMouseUp}
             style={{position: 'relative'}}>
            <div style={{transform: `translateX(-${translate}px)`}}>
                {props.children}
            </div>
            <DeletableBackground passedThreshold={passedThreshold}/>
        </div>
    )
}