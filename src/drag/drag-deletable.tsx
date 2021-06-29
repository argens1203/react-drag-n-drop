import React, {createRef, useEffect, useState} from "react";
import {useDragHook} from "./custom-drag.hook";
import {DeletableBackground} from "../blocks/deletable-background";

type Props = {
    children: React.ReactNode;
}


export function DragDeletable(props: Props) {
    const [listeners, dragContext] = useDragHook();
    const {onMouseDown, onMouseUp, onMouseMove} = listeners;
    const {translate, isDragging} = dragContext;

    const [width, setWidth] = useState<number | undefined>();
    const ref = createRef<HTMLDivElement>();
    console.log('rerending');
    useEffect(() => {
        console.log('new width');
        setWidth(ref.current?.offsetWidth);
    }, [ref, ref.current])

    const [passedThreshold, setPassedThreshold] = useState(false);
    useEffect(() => {
        if (isDragging) {
            if (translate && width) {
                setPassedThreshold(-translate / width > 0.25);
            }
        }
    }, [translate, width, isDragging])

    const transform = passedThreshold && !isDragging ? 'translateX(-1000%)' : `translateX(${translate}px)`;

    return (
        <div ref={ref}
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
             onMouseUp={onMouseUp}
             onMouseLeave={onMouseUp}
             style={{position: 'relative'}}>
            <div style={{transform}}>
                {props.children}
            </div>
            <DeletableBackground passedThreshold={passedThreshold}/>
        </div>
    )
}