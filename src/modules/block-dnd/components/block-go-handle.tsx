import { useDispatch } from "react-redux"
import {ArrowRight} from '@material-ui/icons';
import { ClickableStretchBox } from "../../../components/container/clickable-stretch-box";
import { generatePath, useHistory } from "react-router";

type Props = {
    id: string;
}

export function BlockGoHandle(props: Props){
    const {id} = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const onClick = () => {
        const path = generatePath("/detail?id=:id", {id});
        history.push(path);
    }

    return (
        <ClickableStretchBox onClick={onClick}>
            <ArrowRight/>
        </ClickableStretchBox>
    )
}