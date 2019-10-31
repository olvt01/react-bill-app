import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import { Provider } from "react-redux";
import { BillAppDataStore } from "./data/DataStore";
import { Connector } from "./bill/Connector";

export default class App extends Component {
    render() {
        return <Provider store={ BillAppDataStore }>
            <Router>
                <Switch>
                    <Route path="/" component={ Connector } />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </Provider>
    }
}
