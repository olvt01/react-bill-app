import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "./data/Actions";
import { CombinedContextWrapper } from "./CombinedContextWrapper";
import { Subscription } from "./bill/Subscription";
import "./css/NavBar.css";

const mapDispatchToProps = { ...Actions };

export const NavBar = connect(ds => ds, mapDispatchToProps)(
  withRouter(CombinedContextWrapper(class extends Component {

    signout = () => {
      this.props.signout();
    }

    info = () => {
      if (this.props.match.params!=null) {
        switch (this.props.match.params.section) {
          case 'home':
            return <span className='nav-info'>홈</span>
          case 'search':
            return <span className='nav-info'>의안검색</span>
          case 'law':
            if (this.props.match.params.category==null) {
                return <span className='nav-info'>법안 목록</span>
            }
            return <React.Fragment>
              <Link to='/law'>
                <span className='nav-info'>
                  <i className="fas fa-arrow-left"></i>
                </span>
              </Link>
              <span className='nav-info'>
                { this.props.match.params.category }
              </span>
              <span className='nav-info'>
                <Subscription
                  option='law'
                  id={this.props.param_bill}/>
              </span>
              <span className='nav-info'>
                { this.props.bills_detail_total && this.props.param_page &&
                    this.props.param_page + '/' +
                    Math.ceil(this.props.bills_detail_total/parseInt(this.props.bills_detail_params.page_size || 10))
                }
              </span>
              <span className='nav-info'>
                { this.props.bills_detail_total && `(${this.props.bills_detail_total} 개 의안)`}
              </span>
            </React.Fragment>

          case 'bill':
            switch(this.props.match.params.category) {
              case 'finished':
                return <span className='nav-info'>처리 의안</span>
              case 'mooring':
                return <span className='nav-info'>계류 의안</span>
              default:
                return null
            }

          case 'user':
            switch(this.props.match.params.category) {
              case 'mylist':
                return <span className='nav-info'>내 법안목록</span>
              case 'mybill':
                return <span className='nav-info'>내 의안목록</span>
              case 'mypage':
                return <span className='nav-info'>내 정보</span>
              default:
                return null
            }
          default:
            return null
        }
      }
      return ''
    }

    render() {
      return <nav className="sticky-top main-nav" style={{ marginLeft: this.props.width }}>
          <span className="nav-info">{ this.info() }</span>
          <div className="nav-float-wrapper">
            { this.props.isAuthenticated && this.props.userInfo != null
              ? <React.Fragment>
                  <span className="nav-item"> { this.props.userInfo.name } </span>
                  <span className="nav-item">|</span>
                  <span className="nav-item link" onClick = { () => this.signout() }>로그아웃</span>
                </React.Fragment>
              : null
            }
            { !this.props.isAuthenticated &&
              <React.Fragment>
                <Link to="/user/login">
                  <span className="nav-item link">로그인</span>
                </Link>
                <span className="nav-item">|</span>
                <Link className="nav-item link" to="/user/signup">
                  회원가입
                </Link>
              </React.Fragment>
            }
        </div>
      </nav>
  }
})))
