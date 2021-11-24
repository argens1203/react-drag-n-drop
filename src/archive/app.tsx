import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container} from "@material-ui/core";
import {RootState} from "../middleware/store/store";
import {ROOT_ID} from "../middleware/nodes/constants";
import {getAllBlocks} from "../thunks";
import { Block } from "../modules/block-dnd/components/block";
import { createBlock } from "../thunks";
import AddIcon from '@material-ui/icons/Add';
import {IS_PARENT} from "../middleware/relationships/constants";
import './app.css';

function App() {
  const rootLookup = useSelector((state: RootState) => state.relationship.lookup[IS_PARENT]?.[ROOT_ID]) || {};
  const rootOrder = useSelector((state: RootState) => state.block.order || []);
  const rootIds = rootOrder.filter(id => rootLookup[id]);
  const dispatch = useDispatch();

  return (
    <Container>
      {/*<Button onClick={() => {dispatch(initBlock())}}>initBlocks</Button>*/}
      <Button onClick={() => {dispatch(getAllBlocks())}}>getBlocks</Button>
      <Button onClick={() => {dispatch(createBlock())}}><AddIcon/></Button>
      {rootIds.map(id => <Block key={id} id={id}/>)}
    </Container>
  );
}

export default App;
