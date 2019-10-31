import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BillDisplay } from "./BillDisplay"
import { BillNavigation } from "./BillNavigation"

export class MainPage extends Component {
  render() {
    return <div className="container-fluid">
      <div className="row">
        <div className="col bg-dark text-white p-1">
          <Link className="btn btn-sm bg-dark text-white" to="/">
            <i className="fas fa-bars">
            </i>
          </Link>
          <small>
            마이홈
          </small>

        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-3 col-xl-2 bd-sidebar">
          <BillNavigation baseUrl="/bill" bills={ this.props.bills } />
        </div>
        <div className="col-12 col-md-9  border">
          <BillDisplay { ...this.props }/>
        </div>
      </div>
    </div>
  }
}
