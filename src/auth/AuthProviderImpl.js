import React, { Component } from "react";
import Axios from "axios";
import { AuthContext } from "./AuthContext";
import { DataTypes } from "../data/Types";
import { AuthUrls } from "../data/Urls";

export const AuthProviderImpl = class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            webToken: null,
            userInfo: null,
            userSubscription: [],
            userBookmark: [],
        }
    }

    getUser = (token) => {
      return Axios.get(AuthUrls[DataTypes.MANAGEUSER],
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.status===200) {
              this.setState({
                  userInfo: response.data
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
              this.setState({ userInfo: response.data })
              return true;
          } else {
              throw new Error("Invalid Credentials");
          }
      })
    }

    signout = () => {
        this.setState({
          isAuthenticated: false,
          webToken: null,
          userInfo: null,
          userSubscription: [],
          userBookmark: [],
        });
    }

    updateUserData = (token, newUserInfo) => {
      return Axios.patch(AuthUrls[DataTypes.MANAGEUSER],
        newUserInfo,
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
            if (response.status === 200) {
                this.setState({ userInfo: response.data })
                return response;
            } else {
                throw new Error("Invalid Credentials");
            }
        })
    }

    setUserSubscription = (token) => {
      return Axios.get(AuthUrls[DataTypes.USER_SUBSCRIPTION],
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.data) {
              const subscription = response.data.results.map(p=>{
                return {
                  id: p.id,
                  bill_id: p.subscribe_bill.id
                }
              })
              this.setState({ userSubscription: subscription });
          }
      });
    }

    subscribeLaw = (billId, token) => {
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

    unSubscribeLaw = (id, token) => {
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

    setUserBookmark = (token) => {
      return Axios.get(AuthUrls[DataTypes.USER_BOOKMARK],
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.data) {
              this.setState({ userBookmark: response.data.results });
          }
      });
    }

    subscribeBill = (billno, token) => {
      return Axios.post(AuthUrls[DataTypes.USER_BOOKMARK],
        { "bookmark": billno },
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.status===201) {
            this.setState({
              userBookmark: [
                ...this.state.userBookmark,
                response.data
              ]
            });
            return response.data.id;
          } else {
            throw new Error("Invalid Credentials");
          }
        })
    }

    unSubscribeBill = (id, token) => {
      return Axios.delete(`${AuthUrls[DataTypes.USER_BOOKMARK]}${id}/`,
        { headers: {"Authorization" : `TOKEN ${token}`} }).then(response => {
          if (response.status===204) {
            this.setState({
              userBookmark: this.state.userBookmark.filter(item=>{
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
                subscribeLaw: this.subscribeLaw,
                unSubscribeLaw: this.unSubscribeLaw,
                setUserBookmark: this.setUserBookmark,
                subscribeBill: this.subscribeBill,
                unSubscribeBill: this.unSubscribeBill,
                updateUserData: this.updateUserData,
              }}>
            { this.props.children }
        </AuthContext.Provider>
}
