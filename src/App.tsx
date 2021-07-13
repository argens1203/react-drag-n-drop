import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container} from "@material-ui/core";
import {RootState} from "./redux/store";
import {ROOT_ID} from "./redux/root-id.const";
import './App.css';
import {getBlock} from "./thunks/get-block.thunk";
import { Block } from "./blocks/block";
import { initBlock } from "./thunks/init-block.thunk";

function App() {
  const rootLookup = useSelector((state: RootState) => state.block.isChildren[ROOT_ID]) || {};
  const rootOrder = useSelector((state: RootState) => state.block.childrenOrder[ROOT_ID]) || [];
  const rootIds = rootOrder.filter(id => rootLookup[id]);
  const dispatch = useDispatch();

  return (
    <Container>
      <Button onClick={() => {dispatch(initBlock())}}>initBlocks</Button>
      <Button onClick={() => {dispatch(getBlock())}}>getBlocks</Button>
      {rootIds.map(id => <Block key={id} id={id}/>)}
    </Container>
  );
}

export default App;
