import React, { Component } from "react";
import { CombinedContextWrapper } from "../CombinedContextWrapper";
import "../css/MainPage.css";
import "../css/Table.css";

export const MainPage = CombinedContextWrapper(class extends Component {
  render() {
    return <React.Fragment>

      <div className="main-wrapper" style={{ marginLeft: this.props.width }}>
          { this.props.children }
      </div>
    </React.Fragment>
  }
})
