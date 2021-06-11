import './App.css';
import {Button, Container, Input, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createPreset, getPreset, grabAll} from "./redux/data";
import {RootState} from "./redux";
import {TypeArea} from "./components/type-area";
import {NodeContainer} from "./module/node/components/node-container";

function App() {
    const dispatch = useDispatch();
    const root = useSelector((state: RootState) => state.data.root);

    return (
        <Container>
            <Button onClick={() => dispatch(grabAll())}>
                Grab All
            </Button>
            <Button onClick={() => dispatch(createPreset())}>
                Create Preset
            </Button>
            <Button onClick={() => dispatch(getPreset())}>
                Get Preset
            </Button>
            <NodeContainer root={root}/>
            <TypeArea/>
        </Container>
    );
}

export default App;
