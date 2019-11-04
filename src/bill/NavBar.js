import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToggleLink } from "../ToggleLink"
import { authWrapper } from "../auth/AuthWrapper";


export default authWrapper(class extends Component {
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
                    <button onClick={ this.props.signout }
                        className="btn btn-sm bg-dark text-white">
                        <small>Log Out</small>
                    </button>
                  }
                  { !this.props.isAuthenticated &&
                    <Link className="btn btn-sm bg-dark text-white" to="/user">
                      <small>Login</small>
                    </Link>
                  }
                </div>
            </div>
    }
})
