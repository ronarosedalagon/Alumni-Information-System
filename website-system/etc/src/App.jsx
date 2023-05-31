import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Route, Switch,} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Index";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/" component={Login}/>
          <Route exact path="/Signup" component={Signup}/>
          <Route exact path="/Dashboard" component={Dashboard}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
