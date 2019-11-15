import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Axios from "axios";
import { AuthWrapper } from "../auth/AuthWrapper";
import { DataTypes } from "../data/Types";
import { AuthUrls } from "../data/Urls";
import { SideBar } from "./SideBar";
import "./User.css";

export default AuthWrapper(class extends Component {
    render() {
      if (this.props.bills==null || this.props.userSubscription==null) {
        return <div>...Loading</div>
      }
      return <React.Fragment>
          <SideBar baseUrl="/bill" bills={ this.props.bills } />
            <div className="container-fluid">
              <div className="main">
                { this.props.bills.results.filter(p=>{
                  for(let i in this.props.userSubscription) {
                    if(p.id===this.props.userSubscription[i].bill_id) {
                      return true;
                    }
                  }
                  return false;
                }).map(p=>
                  <span key={p.id}>
                    {p.id} {p.bill}
                  </span>
                )}
            </div>
          </div>
        </React.Fragment>
    }

    componentDidMount = () => {
      this.props.setUserSubscription(this.props.webToken);
      if (0) {
        console.log('0000000000000000000');
      }
    }
})
