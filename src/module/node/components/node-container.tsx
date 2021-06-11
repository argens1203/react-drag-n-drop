import {NodeById} from "./node-by-id";
import {Container} from "@material-ui/core";

type Props = {
    root?: string | null;
};

export function NodeContainer(props: Props) {
    const {root} = props;
    console.log(root);
    if (!root) {
        return null;
    }
    return (
        <Container>
            <NodeById id={root}/>
        </Container>
    );
}