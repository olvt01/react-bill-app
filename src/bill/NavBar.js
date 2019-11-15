import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToggleLink } from "../ToggleLink";
import { AuthWrapper } from "../auth/AuthWrapper";
import "./NavBar.css";

export default AuthWrapper(class extends Component {
  render() {
    return <nav className="bg-dark text-white sticky-top main-nav">
      <div className="">
        <Link className="btn btn-sm bg-dark text-white" to="/">
          <i className="fas fa-arrows-alt-h"></i>
        </Link>
        <Link className="btn btn-sm bg-dark text-white" to="/">HOME</Link>
        <Link className="btn btn-sm bg-dark text-white" to="/bill">찾기</Link>
        <Link className="btn btn-sm bg-dark text-white" to="/user">
          내 리스트
        </Link>
        <div className="float-right main-nav">
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
              <Link className="btn btn-sm bg-dark text-white" to="/user/login">
                Login
              </Link>
              <Link className="btn btn-sm bg-dark text-white" to="/user/signup">
                SignUp
              </Link>
            </React.Fragment>
          }
        </div>
      </div>

    </nav>
  }
})
