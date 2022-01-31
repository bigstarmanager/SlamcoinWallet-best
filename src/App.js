import React from 'react';

import Dashboard from './screen/Dashboard';
import Affiliation from './screen/Affiliation';
import Transaction from './screen/Transaction';
import Setting from './screen/Setting';
import Slamchat from './Slamchat';
import LoginScreen from './screen/LoginScreen';
import Staking from './screen/Staking';
import ForgetScreen from './screen/ForgetScreen';
import ResetScreen from './screen/ResetScreen';
import HoldingNFT from './screen/HoldingNFT';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './store';
import RegisterScreen from './screen/RegisterScreen';

function App() {

  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/Affiliation" component={Affiliation} />
            <Route exact path="/Transaction" component={Transaction} />
            <Route exact path="/Setting" component={Setting} />
            <Route exact path="/Slamchat" component={Slamchat} />
            <Route exact path="/Staking" component={Staking} />
            
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgetpassword" component={ForgetScreen} />
            <Route exact path="/resetpassword" component={ResetScreen} />
            <Route exact path="/HoldingNFT" component={HoldingNFT} />
          </Switch>
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;
