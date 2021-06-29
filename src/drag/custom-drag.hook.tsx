import {useState} from "react";

type DragContext = {
    isDragging: boolean;
    start: number | undefined;
    current: number | undefined;
}

type Listeners = {
    onMouseDown: (e: any) => void,
    onMouseMove: (e: any) => void,
    onMouseUp: (e: any) => void
};

export function useDragHook(): [Listeners, DragContext] {
    const [dragContext, setDragContext] = useState<DragContext>({
        isDragging: false,
        start: undefined,
        current: undefined,
    })
    const onMouseDown = (e: any) => {
        setDragContext(context => ({
            ...context,
            isDragging: true,
            start: e.clientX
        }))
    };
    const onMouseMove = (e: any) => {
        setDragContext(context => ({
            ...context,
            current: context.isDragging ? e.clientX : undefined
        }))
    };
    const onMouseUp = (e: any) => {
        setDragContext({
            isDragging: false,
            start: undefined,
            current: undefined,
        })
    }
    const listeners: Listeners = {onMouseDown, onMouseMove, onMouseUp};
    return [listeners, dragContext];
}