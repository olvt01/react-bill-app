import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../data/Actions";
import { DataTypes } from "../data/Types";
import { DataGetter } from "../data/DataGetter";
import { MainPage } from "./MainPage";
import { SideBar } from "../SideBar";
import { NavBar } from "../NavBar";
import { Home } from "./Home";
import { LawList } from "./LawList";
import { LawBillsList } from "./LawBillsList";
import { BillList } from "./BillList";
import { Search } from "./Search";
import { UserConnector } from "./UserConnector";
import { PopUp } from "../PopUp";
import { CombinedContextWrapper } from "../CombinedContextWrapper";

const mapDispatchToProps = { ...Actions };

export const Connector = connect(ds => ds, mapDispatchToProps)(
    CombinedContextWrapper(class extends Component {
        selectComponent = (routeProps) => {
            const wrap = (Component, Content) =>
                {
                  if (Content) {
                    return <Component { ...this.props }  { ...routeProps }>
                        { wrap(Content) }
                      </Component>
                  }
                  else {
                    return <React.Fragment>
                      <SideBar { ...routeProps } />
                      <NavBar { ...routeProps } />
                      <MainPage>
                        <Component { ...this.props }  { ...routeProps } />
                      </MainPage>
                      <div>
                        {this.props.popUpSeen ? <PopUp toggle={this.props.togglePop} /> : null}
                      </div>
                    </React.Fragment>
                  }
                }

            switch (routeProps.match.params.section) {
                case "home":
                    return wrap(DataGetter, Home)
                case "search":
                    return wrap(DataGetter, Search)
                case "law":
                    if (routeProps.match.params.category!=null) {
                      return wrap(DataGetter, LawBillsList)
                    }
                    return wrap(DataGetter, LawList)
                case "bill":
                    return wrap(DataGetter, BillList)
                case "user":
                    return wrap(DataGetter, UserConnector)
                default:
                    return <Redirect to="/home" />
            }
        }

        render() {
            return <Switch>
                  <Route path={ "/:section?/:category?" }
                    render = { routeProps => this.selectComponent(routeProps) } />
              </Switch>
        }
        componentDidMount = () => {
          this.props.loadData(DataTypes.COMMITTEES, {page_size:100});
        }
    }
))
