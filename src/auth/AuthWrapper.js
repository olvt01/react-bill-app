import React, { Component } from "react";
import { AuthContext } from "./AuthContext";

export const AuthWrapper = (WrappedComponent) => 
    class extends Component {
        render = () =>
            <AuthContext.Consumer>
                { context =>
                    <WrappedComponent { ...this.props } { ...context } />
                }
            </AuthContext.Consumer>
    }
