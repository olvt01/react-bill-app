import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../data/Actions";
import { AuthWrapper } from "../auth/AuthWrapper";
import { AuthPrompt } from "../auth/AuthPrompt";
import { AuthSignUpPrompt } from "../auth/AuthSignUpPrompt";
import { MyBill } from "../bill/MyBill";
import { MyList } from "../bill/MyList";
import { MyPage } from "../MyPage";

const mapDispatchToProps = { ...Actions };

export const UserConnector = connect(ds => ds, mapDispatchToProps)(
  AuthWrapper(class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoaded: false
      }
    }

    selectComponent = (routeProps) => {
      switch (routeProps.match.params.category) {
        case "login":
          return <AuthPrompt />
        case "signup":
          return <AuthSignUpPrompt />
        default:
          return <AuthPrompt />
      }
    }

    ConnectedUser = (routeProps) => {
      if(!this.state.isLoaded) {
        this.setState({ isLoaded: true }, function() {
          this.props.setUserSubscription(this.props.webToken);
          this.props.setUserBookmark(this.props.webToken);
        });
      }
      switch (routeProps.match.params.category) {
        case "mylist":
          return <MyList { ...this.props } {...routeProps} />
        case "mybill":
          return <MyBill { ...this.props } {...routeProps} />
        case "mypage":
          return <MyPage { ...this.props } {...routeProps} />
        default:
          return routeProps.history.push('/user/mylist')
      }
    }

    render() {
      return <Switch>
          {
            !this.props.isAuthenticated &&
              <Route render = { routeProps => this.selectComponent(routeProps) } />
          }
          <Route path="/user/:category?" render={ routeProps => this.ConnectedUser(routeProps) } />
        </Switch>
    }
  }
))
