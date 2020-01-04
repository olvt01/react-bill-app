import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import { Provider } from "react-redux";
import { BillAppDataStore } from "./data/DataStore";
import { Connector } from "./bill/Connector";
import { AuthProviderImpl } from "./auth/AuthProviderImpl";
import { CssProviderImpl } from "./css/CssProviderImpl";

export default class App extends Component {
  render() {
    return <Provider store={ BillAppDataStore }>
      <AuthProviderImpl>
        <CssProviderImpl>
          <Router>
            <React.Fragment>
              <Switch>
                <Route path="/" component={ Connector } />
                <Redirect to="/" />
              </Switch>
            </React.Fragment>
          </Router>
        </CssProviderImpl>
      </AuthProviderImpl>
    </Provider>
  }
}
