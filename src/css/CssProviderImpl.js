import React, { Component } from "react";
import { CssContext } from "./CssContext";

export class CssProviderImpl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: '50px',
      collapsed: true,
      popUpSeen: false
    }
  }

  togglePop = () => {
    this.setState({ popUpSeen: !this.state.popUpSeen });
  }

  toggleSideBar = () => {
    this.setState(state => ({
      width:
        state.width === '220px'
          ? '50px'
          : '220px',
      collapsed:
        state.collapsed === false
          ? true
          : false
    }))
  }


  render = () =>
    <CssContext.Provider value={ {...this.state,
        togglePop: this.togglePop,
        toggleSideBar: this.toggleSideBar
      }}>
      { this.props.children }
    </CssContext.Provider>
}
