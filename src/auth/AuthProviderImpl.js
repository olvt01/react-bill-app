import React, { Component } from "react";
import Axios from "axios";
import { AuthContext } from "./AuthContext";
import { DataTypes } from "../data/Types";
import { AuthUrls } from "../data/Urls";

export class AuthProviderImpl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            webToken: null,
            name: null,
        }
    }

    getUser = (credentials) => {
      return Axios.get(AuthUrls[DataTypes.MANAGEUSER], credentials).then(response => {
        console.log(response)
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
                this.getUser(credentials);
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
        this.setState({ isAuthenticated: false, webToken: null, name: null, });
    }

    render = () =>
        <AuthContext.Provider value={ {...this.state,
                authenticate: this.authenticate,
                signup: this.signup,
                signout: this.signout}}>
            { this.props.children }
        </AuthContext.Provider>
}
