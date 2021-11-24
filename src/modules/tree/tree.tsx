import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Typography} from "@material-ui/core";
import {RootState} from "../../middleware/store/store";
import {IS_PARENT} from "../../middleware/relationships/constants";
import { Block } from "../block-dnd/components/block";
import { createBlock, getBlockWithTitle } from "../../thunks";
import './tree.css';
import { DebugHeader } from "../../components/headers";

type Props = {
  title?: string;
};

export function Tree(props: Props) {
  const {title = 'ROOT'} = props;
  const rootId = useSelector((state: RootState) => state.block.titleLookup[title]);
  const lookup = useSelector((state: RootState) => state.relationship.lookup[IS_PARENT]?.[rootId]) || {};
  const order = useSelector((state: RootState) => state.block.order || []);
  
  const ids = order.filter(id => lookup[id]);
  const dispatch = useDispatch();

  return (
    <Container>
      <DebugHeader id={''} title={title}/>
      <Container>
        <Typography>
          This page gets block by title
        </Typography>
      </Container>
      {ids.map(id => <Block key={id} id={id}/>)}
    </Container>
  );
}
