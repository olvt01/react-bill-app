import React, { Component } from "react";
import {  Route, NavLink, withRouter } from "react-router-dom";
import { CombinedContextWrapper } from "./CombinedContextWrapper";
import * as Actions from "./data/Actions";
import { ActionTypes } from "./data/Types";
import "./css/SideBar.css";

export const SideBar = withRouter(CombinedContextWrapper(class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }

  }
  handleKeyDown = (ev) => {
    if (ev.key === 'Enter') {
        Actions.setParams(ActionTypes.DATA_SET_PAGE, 1);
        Actions.setParams(ActionTypes.DATA_SET_SEARCH_PROPERTY, ev.target.value);
        Actions.setParams(ActionTypes.DATA_SET_FINISHED, '');
        return this.props.history.push('/search/bill')
    }
  }
  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }

  }

  render() {
    return <div className="sidebar-wrapper" style={{ width: this.props.width }}>

      <div className="sidebar-top">
        <ToggleLink
          to='/home'
          collapsed={this.props.collapsed}
          icon='fas fa-home'>
          홈
        </ToggleLink>
        <div style={{ height:'15px'}}></div>

        <div className="sidebar-item"
          style={{ width: '50px', fontSize:'22px', textAlign:'center' }}
          onClick={ () => this.props.toggleSideBar() }>
          <i className="fas fa-bars" style= {{ color: '#bfbfbf' }}></i>
        </div>

        <div className="sidebar-item" style={{textAlign:'center'}}>
          {
            this.props.collapsed
              ? <span className='sidebar-item-collapsed' onClick={ () => this.props.toggleSideBar()} style={{cursor: 'pointer'}}>
                  <i className="fas fa-search" ></i>
                </span>
              : <React.Fragment>
                  <input
                    style={{ width: '75%', fontSize:'18px'}}
                    placeholder='Search'
                    value={ this.state.searchTerm }
                    onChange={ this.onSearchChange }
                    onKeyDown={this.handleKeyDown}
                    ref={ el => this.input = el }/>
                  <button
                    className="button"
                    style={{ display: 'inline-block'}}
                    onClick={this.handleKeyDown}>
                      <i className="fas fa-search" />
                  </button>
            </React.Fragment>

          }
        </div>

      </div>
      <div style={{ height:'15px'}}></div>
      <div className="sidebar-main">
        {
          this.props.isAuthenticated
          ? <React.Fragment>
              <ToggleLink
                to='/user/mylist'
                collapsed={this.props.collapsed}
                icon='fas fa-star'>
                내 법안목록
              </ToggleLink>
              <ToggleLink
                to='/user/mybill'
                collapsed={this.props.collapsed}
                icon='far fa-bookmark'>
                내 의안목록
              </ToggleLink>
              <div style={{ height:'15px'}}></div>
            </React.Fragment>
          : null
        }
        <ToggleLink
          to='/law'
          collapsed={this.props.collapsed}
          icon='fas fa-list-alt'>
          법안 목록
        </ToggleLink>
        <ToggleLink
          to='/bill/finished'
          collapsed={this.props.collapsed}
          icon='fas fa-file'>
          처리 의안
        </ToggleLink>
        <ToggleLink
          to='/bill/mooring'
          collapsed={this.props.collapsed}
          icon='far fa-file'>
          계류 의안
        </ToggleLink>
        {
          this.props.isAuthenticated
          ? <div style={{ position: 'absolute',  bottom: '0'}}>
              <ToggleLink
                to='/user/mypage'
                collapsed={this.props.collapsed}
                icon='fas fa-user'>
              </ToggleLink>
            </div>
          : null
        }
      </div>
    </div>
  }
}))

class ToggleLink extends Component {
    render() {
        return <Route path={ this.props.to } exact={ this.props.exact }
                children={ routeProps => {

            const baseClasses = this.props.className || "sidebar-item";
            const activeClass = this.props.activeClass || "active";
            const inActiveClass = this.props.inActiveClass || "inactive";

            const combinedClasses =
                `${baseClasses} ${routeProps.match ? activeClass : inActiveClass}`

            return <NavLink
                    className={ combinedClasses }
                    to={ this.props.to }
                    >
                      <span className='sidebar-item-collapsed'><i className={ this.props.icon }></i></span>
                      <span className='sidebar-item-expanded' style={this.props.collapsed ? { visibility: 'hidden' } : {}}>{ this.props.children }</span>
              </NavLink>
         }} />
    }
}
