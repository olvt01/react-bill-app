import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { authWrapper } from "../auth/AuthWrapper";
import { AuthPrompt } from "../auth/AuthPrompt";
import { MyListConnector } from "./MyListConnector";

export default authWrapper(class extends Component {

    render() {
        return  <div className="col-9 p-2">
            <Switch>
                {
                    !this.props.isAuthenticated &&
                        <Route component={ AuthPrompt } />
                }

                <Route path="/user" component={ MyListConnector } />
                <Redirect to="/user" />
            </Switch>
        </div>
    }
})
