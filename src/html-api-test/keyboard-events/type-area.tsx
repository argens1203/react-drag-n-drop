import React, {useEffect} from 'react';

export function KeyboardEvents() {
    const onKeyPress = (ev: KeyboardEvent) => console.log(ev);
    const onKeyDown = (ev: KeyboardEvent) => console.log(ev);
    const onKeyUp = (ev: KeyboardEvent) => console.log(ev);

    useEffect(() => {
        window.addEventListener('keypress', onKeyPress);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keypress', onKeyPress);
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);
        }
    }, []);
    return (
        <div/>
    )
}