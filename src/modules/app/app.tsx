import React, { useEffect } from "react";
import {BrowserRouter as Router, useLocation, Switch, Route} from "react-router-dom";
import {Tree} from '../tree';
import {Page} from '../page';
import {Detail} from '../detail';
import { useDispatch } from "react-redux";
import {RelationshipType} from "../../middleware/relationships/enums";
import {registerRelationship} from "../../middleware/relationships/slice";
import {IS_PARENT} from "../../middleware/relationships/constants";
import { NavigationalHeader } from "../../components/headers/navigational-header";
import { Container } from "@material-ui/core";

function App() {
  const {search} = useLocation();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(registerRelationship({relationship: IS_PARENT, type: RelationshipType.ONE_TO_MANY}));
  }, []);
  console.log(search, search);
  const query = new URLSearchParams(search);
  const title = query.get('title') || 'ROOT';
  const id = query.get('id') ?? undefined;

  return (
      <Container>
        <NavigationalHeader id={id} title={title}/>
        <Switch>
        <Route path='/detail'>
          <Detail id={id}/>
        </Route>
        <Route path='/page'>
          <Page id={id}/>
        </Route>
        <Route path='/tree'>
          <Tree title={title}/>
        </Route>
        <Route path='/'>
          <Tree title={title}/>
        </Route>
      </Switch>
      </Container>
  );
}

export default App;
