import React, { Component } from "react";
import Axios from "axios";
import { AuthContext } from "./AuthContext";
import { DataTypes } from "../data/Types";
import * as Actions from "../data/Actions";
import { AuthUrls } from "../data/Urls";

export class AuthProviderImpl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            webToken: null,
            name: null,
            userSubscription: []
        }
    }

    getUser = (token) => {
      return Axios.get(AuthUrls[DataTypes.MANAGEUSER],
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.status===200) {
              this.setState({
                  name: response.data.name
              })
              return true;
          } else {
              throw new Error("Invalid Credentials");
          }
      })
    }

    authenticate = (credentials) => {
        return Axios.post(AuthUrls[DataTypes.TOKEN], credentials).then(response => {
            if (response.data.token) {
                this.getUser(response.data.token);
                this.setState({
                    isAuthenticated: true,
                    webToken: response.data.token
                });
                return true;
            } else {
                throw new Error("Invalid Credentials");
            }
        })
    }

    signup = (credentials) => {
      return Axios.post(AuthUrls[DataTypes.CREATEUSER], credentials).then(response => {
          if (response.status === 201) {
              delete credentials.name;
              this.authenticate(credentials);
          } else {
              throw new Error("Invalid Credentials");
          }
      })
    }

    signout = () => {
        this.setState({
          isAuthenticated: false,
          webToken: null,
          name: null,
          userSubscription: [],
        });
    }

    setUserSubscription = (token) => {
      return Axios.get(AuthUrls[DataTypes.USER_SUBSCRIPTION],
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.data) {
              const subscription = response.data.results.map(p=>{
                return {
                  id: p.id,
                  bill_id: p.subscribe_bill.bill_id
                }
              })
              this.setState({ userSubscription: subscription });
              Actions.loadUserSubscription(DataTypes.USER_SUBSCRIPTION, subscription);
          }
      });
    }

    subscribe = (billId, token) => {
      return Axios.post(AuthUrls[DataTypes.USER_SUBSCRIPTION],
        { "subscribe_bill": billId },
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.status===201) {
            this.setState({
              userSubscription: [
                ...this.state.userSubscription, {
                  id: response.data.id,
                  bill_id: billId
              }]
            });
            return response.data.id;
          } else {
            throw new Error("Invalid Credentials");
          }
        })
    }

    unSubscribe = (id, token) => {
      console.log('Unsubscribing...');
      return Axios.delete(`${AuthUrls[DataTypes.USER_SUBSCRIPTION]}${id}/`,
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.status===204) {
            this.setState({
              userSubscription: this.state.userSubscription.filter(item=>{
                if(id===item.id) {
                  return false;
                }
                return true;
              })
            })
            return true;
          } else {
            throw new Error("Invalid Credentials");
          }
        })
    }

    render = () =>
        <AuthContext.Provider value={ {...this.state,
                authenticate: this.authenticate,
                signup: this.signup,
                signout: this.signout,
                setUserSubscription: this.setUserSubscription,
                subscribe: this.subscribe,
                unSubscribe: this.unSubscribe
              }}>
            { this.props.children }
        </AuthContext.Provider>
}
