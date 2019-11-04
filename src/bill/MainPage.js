import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BillDisplay } from "./BillDisplay";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

export class MainPage extends Component {
  render() {
    return <div className="container-fluid border">
      <div className="row">
        <div className="col-12 col-md-3 col-xl-2 bd-sidebar">
          <SideBar baseUrl="/bill" bills={ this.props.bills } />
        </div>
        <div className="col-12 col-md-9  border">
          <BillDisplay { ...this.props }/>
        </div>
      </div>
    </div>
  }
}
