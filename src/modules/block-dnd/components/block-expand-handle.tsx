import { useDispatch } from "react-redux"
import {ArrowDownward} from '@material-ui/icons';
import {getChildren} from '../../../thunks/get-children.thunk';
import { ClickableStretchBox } from "../../../components/container/clickable-stretch-box";

type Props = {
    id: string;
}

export function BlockExpandHandle(props: Props){
    const {id} = props;
    const dispatch = useDispatch();
    const onClick = () => dispatch(getChildren(id));

    return (
        <ClickableStretchBox onClick={onClick}>
            <ArrowDownward/>
        </ClickableStretchBox>
    )
}