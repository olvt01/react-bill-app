import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter }
    from "react-router-dom";
import { connect } from "react-redux";
import User from "../bill/User";
import { MainPage } from "./MainPage";
import * as Actions from "../data/Actions";
import { DataTypes } from "../data/Types";
import { DataGetter } from "../data/DataGetter";


const mapDispatchToProps = { ...Actions };

export const MyListConnector = connect(ds => ds, mapDispatchToProps)(
    class extends Component {
        selectComponent = (routeProps) => {
            const wrap = (Component, Content) =>
                <Component { ...this.props }  { ...routeProps }>
                    { Content && wrap(Content) }
                </Component>
            switch (routeProps.match.params.section) {
                case "bill":
                    return wrap(DataGetter, MainPage)
                case "user":
                    return wrap(User)
                default:
                    return <Redirect to ='/' />
            }
        }
        render() {
            return <Switch>
                <Route path={ "/:section?/:category?" }
                    render = { routeProps => this.selectComponent(routeProps) } />
            </Switch>
        }
        componentDidMount = () => this.props.loadData(DataTypes.BILLS, {page_size:1000});
    }
)