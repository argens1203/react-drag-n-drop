import { Button, Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import {
    getBlock as getBlockThunk,
    getAllBlocks as getAllBlocksThunk,
    getBlockWithTitle as getBlockWithTitleThunk,
    createBlock as createBlockThunk,
} from '../../thunks';
type Props = {
    id?: string;
    title?: string;
};

export function DebugHeader(props: Props){
    const {id, title} = props;
    const dispatch = useDispatch();
    const getBlock = () => {
        if (!id) return;
        dispatch(getBlockThunk(id));
    }
    const getAllBlocks = () => {
        dispatch(getAllBlocksThunk());
    }
    const getBlockWithTitle = () => {
        if(!title) return;
        dispatch(getBlockWithTitleThunk(title));
    }
    const createBlock = () => {
        dispatch(createBlockThunk());
    }
    return (
        <Container>
            <Button onClick={getBlock}>Get Block</Button>
            <Button onClick={getAllBlocks}>Get All Blocks</Button>
            <Button onClick={getBlockWithTitle}>Get Block With Title</Button>
            <Button onClick={createBlock}>Create Block <AddIcon/></Button>
        </Container>
    )
}