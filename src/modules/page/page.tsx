import React from "react";
import {useDispatch, useSelector} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import {Button, Container, Typography} from "@material-ui/core";
import {RootState} from "../../middleware/store/store";
import {IS_PARENT} from "../../middleware/relationships/constants";
import { BlockSimplified } from "../block-dnd/components";
import { createBlock, getBlockWithTitle } from "../../thunks";
import './page.css';
import { getChildren } from "../../thunks/get-children.thunk";
import { DebugHeader } from "../../components/headers";

type Props = {
  id?: string;
};

export function Page(props: Props) {
  const {id = ''} = props;
  const lookup = useSelector((state: RootState) => state.relationship.lookup[IS_PARENT]?.[id]) || {};
  const order = useSelector((state: RootState) => state.block.order || []);
  
  const ids = order.filter(nodeId => lookup[nodeId]);
  const dispatch = useDispatch();

  if(!id){
    return null;
  }

  return (
    <Container>
      <DebugHeader id={id}/>
      <Button onClick={() => {dispatch(getChildren(id))}}>getBlocks</Button>
      <Button onClick={() => {dispatch(createBlock())}}><AddIcon/></Button>
      <Typography>id: {id}</Typography>
      {ids.map(id => <BlockSimplified key={id} id={id}/>)}
    </Container>
  );
}
