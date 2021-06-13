import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {generate} from 'short-uuid';
import {Button, Container, Typography} from "@material-ui/core";
import './App.css';
import {putBlock, setParentAsRoot} from './redux/data.slice';
import {RootState} from "./redux/store";
import {SquareWithChildren} from "./components/squares/with-children";

const initColors = ['red', 'blue', 'grey', 'green', 'yellow', 'black'];


function App() {
  const rootLookup = useSelector((state: RootState) => state.block.root) || [];
  const rootIds = Object.entries(rootLookup).filter(([, b]) => !!b).map(([k]) => k);
  const dispatch = useDispatch();
  const initBlocks = () => {
    const getBlock = (color: string) => ({
      id: generate(),
      color
    });
    initColors.forEach(color => {
      const block = getBlock(color);
      dispatch(putBlock(block));
      dispatch(setParentAsRoot(block.id));
    });
  };
  return (
    <Container>
      <Button onClick={initBlocks}>initBlocks</Button>
      {rootIds.map(id => <SquareWithChildren key={id} id={id}/>)}
    </Container>
  );
}

export default App;
