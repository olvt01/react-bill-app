import React, { Component } from "react";
import { AuthContext } from "./auth/AuthContext";
import { CssContext } from"./css/CssContext";

export const CombinedContextWrapper = (WrappedComponent) =>
  class extends Component {
    render = () =>
      <AuthContext.Consumer>
        { auth => (
          <CssContext.Consumer>
            { css => (
              <WrappedComponent { ...this.props } { ...auth } { ...css } />
            )}
          </CssContext.Consumer>
        )}
      </AuthContext.Consumer>
    }
