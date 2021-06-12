import './App.css';
import {Square} from "./components/squares/square";
import {Container, Typography} from "@material-ui/core";

function App() {
    return (
        <Container>
            <Typography>
                I'm not dead
            </Typography>
            <Square/>
        </Container>
    );
}

export default App;
