import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Friends from './friends/Friends';
import Header from './header/Header';
import Problem from './problem/Problem';
import Home from './home/Home';
import Problems from './problems/Problems'
import {useStateValue} from './stateProvider'; 
import Login from './login/Login';
import LeaderBoard from './leaderboard/LeaderBoard';
import { useEffect } from 'react';

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
   const loggedInUser = JSON.parse(window.localStorage.getItem("user"))
   console.log("User is ",loggedInUser)

   if(user)
   {
     return
   }

   if(loggedInUser)
   {
     dispatch({
       type:'SET_USER',
       user:loggedInUser
     });
   }
  }, [])

  return (

    <Router>
    <div className="App">
      <Switch>
        <Route path = '/user'>
            <Header/>
            <Friends/>
        </Route>
        <Route path = '/login'>
          <Login/>
          </Route>
        <Route path='/problems'>
          <Header/>
            <Problems/>
          </Route>
        <Route path='/problem/:pid'>
          <Header/>
          <Problem/>
        </Route>
        <Route path='/leaderboard'>
          <Header/>
          <LeaderBoard/>
          </Route>
        <Route path='/'>
          <Header/>
          <Home/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
