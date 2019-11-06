import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter }
    from "react-router-dom";
import { connect } from "react-redux";
import User from "../bill/User";
import { MainPage } from "./MainPage";
import * as Actions from "../data/Actions";
import { DataTypes } from "../data/Types";
import { DataGetter } from "../data/DataGetter";
import { AuthWrapper } from "../auth/AuthWrapper";
import { AuthPrompt } from "../auth/AuthPrompt";
import { AuthSignUpPrompt } from "../auth/AuthSignUpPrompt";


const mapDispatchToProps = { ...Actions };

export const UserConnector = connect(ds => ds, mapDispatchToProps)(
    AuthWrapper(class extends Component {
        selectComponent = (routeProps) => {
            switch (routeProps.match.params.section) {
                case "user":
                    return <AuthPrompt />
                case "signup":
                    return <AuthSignUpPrompt />
            }
        }
        render() {
            return <Switch>
                {
                    !this.props.isAuthenticated &&
                        <Route render = { routeProps => this.selectComponent(routeProps) } />
                }
                <Route path="/user" component={ User } />
                <Redirect to="/user" />
            </Switch>
        }
        componentDidMount = () => {
            console.log('UserConnector');
        }
    }
))
