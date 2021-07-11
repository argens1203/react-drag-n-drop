import React, {createRef, useEffect, useState} from "react";
import {useDragHook} from "./custom-drag.hook";
import {DeletableBackground} from "../blocks/deletable-background";

type Props = {
    children: React.ReactNode;
    style?: Record<string, any>;
}

export function DragDeletable(props: Props) {
    const {style = {}} = props;
    const [listeners, dragContext] = useDragHook();
    const {onMouseDown, onMouseUp, onMouseMove} = listeners;
    const {translate, isDragging} = dragContext;

    const [width, setWidth] = useState<number | undefined>();
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        setWidth(ref.current?.offsetWidth);
        const handleResize = (e: Event) => {
            setWidth(ref.current?.offsetWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [ref])

    const [passedThreshold, setPassedThreshold] = useState(false);
    useEffect(() => {
        if (isDragging) {
            if (translate && width) {
                setPassedThreshold(-translate / width > 0.25);
            }
        }
    }, [translate, width, isDragging])

    const transform = passedThreshold && !isDragging ? 'translateX(-1000%)' : `translateX(${Math.min(translate, 0)}px)`;

    return (
        <div ref={ref}
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
             onMouseUp={onMouseUp}
             onMouseLeave={onMouseUp}
             style={{position: 'relative', ...style}}>
            <div style={{transform, cursor: 'move'}}>
                {props.children}
            </div>
            <DeletableBackground passedThreshold={passedThreshold}/>
        </div>
    )
}