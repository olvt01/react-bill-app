import React, { Component } from "react";
import { CombinedContextWrapper } from "../CombinedContextWrapper";

export const Subscription = CombinedContextWrapper(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      keyId: 0
    };
  }

  onSubscribeLaw = (keyId) => {
    if (this.props.isAuthenticated===false) {
      return alert('로그인이 필요합니다');
    }
    this.setState({ isLoading: true });
    keyId ? this.unSubscribeLaw(keyId) : this.subscribeLaw()
  }

  subscribeLaw = () => {
    this.props.subscribeLaw(this.props.id, this.props.webToken)
      .then(result => {
        if (result) {
          this.setState({ isLoading: false });
          this.setState({ keyId: result });
        }
      })
  }

  unSubscribeLaw = (keyId) => {
    this.props.unSubscribeLaw(keyId, this.props.webToken).then(result => {
      if(result) {
        this.setState(()=> {return { isLoading:false }})
      }
    })
  }

  law = () => {
    let keyId=0;
    for (let i in this.props.userSubscription) {
      if (this.props.id===this.props.userSubscription[i].bill_id) {
        keyId = this.props.userSubscription[i].id;
      }
    }
    if (this.props.userSubscription) {
      return <button className="border" style={{ borderRadius: '5px', backgroundColor: 'white' }}
                  onClick={ () => this.onSubscribeLaw(keyId) }>
              {
                this.state.isLoading
                ? <span className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </span>
                :
                  <i className={ keyId ? "fas fa-star" : "far fa-star" }></i>
              }
            </button>
    }
    return '_'
  }


  onSubscribeBill = (keyId) => {
    if (this.props.isAuthenticated===false) {
      return alert('로그인이 필요합니다');
    }
    this.setState({ isLoading: true });
    keyId ? this.unSubscribeBill(keyId) : this.subscribeBill()
  }

  subscribeBill = () => {
    this.props.subscribeBill(this.props.id, this.props.webToken)
      .then(result => {
        if (result) {
          this.setState({ isLoading: false });
          this.setState({ keyId: result });
        }
      })
  }

  unSubscribeBill = (keyId) => {
    this.props.unSubscribeBill(keyId, this.props.webToken).then(result => {
      if(result) {
        this.setState(()=> {return { isLoading:false }})
      }
    })
  }

  bookmark = () => {
    let keyId=0;
    for (let i in this.props.userBookmark) {
      if (this.props.id===this.props.userBookmark[i].bookmark.billno) {
        keyId = this.props.userBookmark[i].id;
      }
    }
    if (this.props.userBookmark) {
      return <button className="border" style={{ borderRadius: '5px', backgroundColor: 'white' }}
                  onClick={ () => this.onSubscribeBill(keyId) }>
              {
                this.state.isLoading
                ? <span className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </span>
                :
                  <i className={ keyId ? "fas fa-bookmark" : "far fa-bookmark" }></i>
              }
            </button>
    }
    return '_'
  }

  selector = () => {
    switch (this.props.option) {
      case "law":
        return this.law()
      case "bill":
        return this.bookmark()
      default:
        return ''
    }
  }

  render() {
    return <React.Fragment>
     { this.props.userSubscription && this.props.userBookmark
       ? this.selector()
       : null}
    </React.Fragment>
  }
})
