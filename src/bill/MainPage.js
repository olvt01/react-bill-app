import React, { Component } from "react";
import { BillDisplay } from "./BillDisplay";
import { SideBar } from "./SideBar";
import "./MainPage.css";

export class MainPage extends Component {
  render() {
    return <React.Fragment>
      <SideBar baseUrl="/bill" bills={ this.props.bills } />
        <div className="container-fluid">
          <div className="main">
              <BillDisplay { ...this.props }/>
          </div>
        </div>
    </React.Fragment>
  }

  componentDidMount () {
    
  }
}
