import React, {PropsWithChildren} from "react"

type Props = {
    onClick: () => void
}

export function ClickableStretchBox(props: PropsWithChildren<Props>){
    const {onClick, children} = props;
    return (
        <div style={{
            backgroundColor: 'white',
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        }} onClick={onClick}>
            {children}
        </div>
    )
}