import React from "react";
import { useSelector } from "react-redux";
import { Container, Divider, Typography } from "@material-ui/core";
import { NodeEntity } from "../../middleware/nodes/entities";
import { RootState } from "../../middleware/store/store";
import { DebugHeader } from "../../components/headers";

type Props = {
    id?: string;
}

export function Detail (props: Props){
    const {id = ''} = props;
    const entity: NodeEntity | undefined = useSelector((state: RootState) => state.block.blocks[id]);
    const entries = Object.entries(entity || {});
    console.log(entity);
    if (!id){
        return (
            <div>
                There is no id.
            </div>
        )
    }
    return (
        <Container>
            <DebugHeader id={id}/>
            {entries.map(([k, v], idx) => (
                <React.Fragment key={idx}>
                    <Typography>{k}</Typography>
                    {v?.split('\n').map((a: string, idx: number) => (
                        <Typography key={idx}>{a}</Typography>
                    ))}
                    <Divider/>
                </React.Fragment>
            ))}
        </Container>
    )
}