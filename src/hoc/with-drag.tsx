import React from "react";
import {useDrag} from "react-dnd";

export function withDrag<PropType>(type: string, dataItem: ((props: PropType) => Record<string, any>)) {
    return function (InnerComponent: React.ComponentType<PropType>) {
        return function (props: PropType) {
            const [, drag] = useDrag(() => ({
                type,
                item: dataItem(props),
            }));
            return (
                <div ref={drag}>
                    <InnerComponent {...props}/>
                </div>
            )
        }
    }
}