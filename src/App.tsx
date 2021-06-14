import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {generate} from 'short-uuid';
import {Box, Button, Container, Typography} from "@material-ui/core";
import './App.css';
import {putBlock, setParent} from './redux/data.slice';
import {RootState} from "./redux/store";
import {BlockWithChildren} from "./components/blocks/with-children";
import {ROOT_ID} from "./redux/root-id.const";

const initColors = ['red', 'blue', 'grey', 'green', 'yellow', 'black'];


function App() {
  const rootLookup = useSelector((state: RootState) => state.block.isChildren[ROOT_ID]) || {};
  const rootOrder = useSelector((state: RootState) => state.block.childrenOrder[ROOT_ID]) || [];
  const rootIds = rootOrder.filter(id => rootLookup[id]);
  const dispatch = useDispatch();
  const initBlocks = () => {
    const getBlock = (color: string) => ({
      id: generate(),
      color
    });
    initColors.forEach(color => {
      const block = getBlock(color);
      dispatch(putBlock(block));
      dispatch(setParent({child: block.id, parent: ROOT_ID}));
    });
  };
  return (
    <Container>
      <Button onClick={initBlocks}>initBlocks</Button>
      {rootIds.map(id => <BlockWithChildren key={id} id={id}/>)}
    </Container>
  );
}

export default App;
