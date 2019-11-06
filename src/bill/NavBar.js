import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToggleLink } from "../ToggleLink"
import { AuthWrapper } from "../auth/AuthWrapper";


export default AuthWrapper(class extends Component {
    render() {
        return <div className="col bg-dark text-white p-1">
                <Link className="btn btn-sm bg-dark text-white" to="/">
                  <i className="fas fa-bars">
                  </i>
                </Link>
                <Link className="btn btn-sm bg-dark text-white" to="/">
                    <small>HOME</small>
                </Link>
                <Link className="btn btn-sm bg-dark text-white" to="/bill">
                  <small>탐색</small>
                </Link>
                <Link className="btn btn-sm bg-dark text-white" to="/user">
                  <small>내 리스트</small>
                </Link>
                <div className="float-right">
                  { this.props.isAuthenticated &&
                    <React.Fragment>
                      <span> Hi { this.props.name }</span>
                      <button onClick={ this.props.signout }
                          className="btn btn-sm bg-dark text-white">
                          <small>Log Out</small>
                      </button>
                    </React.Fragment>
                  }
                  { !this.props.isAuthenticated &&
                    <React.Fragment>
                      <Link className="btn btn-sm bg-dark text-white" to="/user">
                        <small>Login</small>
                      </Link>
                      <Link className="btn btn-sm bg-dark text-white" to="/signup">
                        <small>SignUp</small>
                      </Link>
                    </React.Fragment>
                  }
                </div>
            </div>
    }
})
