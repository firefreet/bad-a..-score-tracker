import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserRoom from './pages/UserRoom'
import Chat from './pages/Chat';
import NoMatch from "./pages/NoMatch";
import './global.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            HELLOOOO WORLD!!!!
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path='/userroom'>
            <UserRoom />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;