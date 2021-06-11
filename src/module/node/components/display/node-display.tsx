import React from "react";
import {Container, Typography} from "@material-ui/core";
import {NodeComponentProps} from "../../types/node.type";

export function NodeDisplay(props: NodeComponentProps) {
    const {
        node: {
            title,
            preview,
            data
        }
    } = props;
    const inner = [title, preview, data].filter(x => !!x);
    return (
        <Container style={{border: '1px solid black'}}>
            {inner.map((i, idx) => (
                <Typography key={idx}>
                    {i}
                </Typography>
            ))}
        </Container>
    )
}