import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
} from "react-router-dom";

import Home from './app/Home/Home';
import LandingPage from './app/Login/LandingPage';
import Docs from './app/Login/Docs';
import Pricing from './app/Login/Pricing';

import PaymentSuccess from './app/Payment/PaymentSuccess';
import PaymentFailed from './app/Payment/PaymentFailed';
import Notification from './app/Payment/Notification';

import Test from './Test';

function App() {
    
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/how-to-use-it">
                    <Docs />
                </Route>

                <Route path="/pricing">
                    <Pricing />
                </Route>

                <Route path="/pricing">
                    <Pricing />
                </Route>
                
                <Route path="/payment-success">
                    <PaymentSuccess />
                </Route>

                <Route path="/payment-failed">
                    <PaymentFailed />
                </Route>

                <Route path="/notification">
                    <Notification />
                </Route>
                
                <Route exact path="/test">
                    <Test />
                </Route>
                
                <Route path="/:tokenMembership?">
                    <LandingPage />
                </Route>
            
            </Switch>

        </Router>
    );
}

export default App;

