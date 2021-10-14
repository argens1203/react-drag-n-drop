import React from "react";
import {BrowserRouter as Router, useLocation, Switch, Route} from "react-router-dom";
import {Tree} from '../tree';
import {Detail} from '../detail';

function App() {
  const {search} = useLocation();
  console.log(search, search);
  const query = new URLSearchParams(search);
  const title = query.get('title') || 'ROOT';
  const id = query.get('id') ?? undefined;

  return (
      <Switch>
        <Route path='/detail'>
          <Detail id={id}/>
        </Route>
        <Route path='/tree'>
          <Tree title={title}/>
        </Route>
        <Route path='/'>
          <Tree title={title}/>
        </Route>
      </Switch>
  );
}

export default App;
