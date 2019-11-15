import React, { Component } from "react";
import { AuthWrapper } from "../auth/AuthWrapper";
import { DataTypes } from "../data/Types";

export const BillInfo = AuthWrapper(class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      keyId: 0
    };
  }

  onSubscribe = (keyId) => {
    this.setState({ isLoading:true });
    keyId ? this.unSubscribe() : this.subscribe()
  }

  subscribe = () => {
    this.props.subscribe(this.props.billsDetail.results[0].billid, this.props.webToken)
      .then(result => {
        if (result) {
          this.setState({ isLoading: false });
          this.setState({ keyId: result });
        }
      })
  }

  unSubscribe = () => {
    let i, id;
    for (i in this.props.userSubscription) {
      if (this.props.billsDetail.results[0].billid===this.props.userSubscription[i].bill_id) {
        id = this.props.userSubscription[i].id;
      }
    }
    this.props.unSubscribe(id, this.props.webToken).then(result => {
      if(result) {
        this.setState(()=> {return { isLoading:false }})
      }
    })
  }

  render() {
    if (this.props.billsDetail == null || this.props.billsDetail.count === 0) {
        return <h5 className="p-2">No Products</h5>
    }

    let keyId=0;
    for (let i in this.props.userSubscription) {
      if (this.props.billsDetail.results[0].billid===this.props.userSubscription[i].bill_id) {
        keyId = this.props.userSubscription[i].id;
      }
    }

    return <div className="">
        <div className="col-9">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{ this.props.billsDetail.results[0].billname }
                {
                  this.state.isLoading
                  ? <div className="spinner-border m-5" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  : <button className="btn btn-light border"
                      onClick={ () => this.onSubscribe(keyId) }>
                      <i className={ keyId ? "fas fa-star" : "far fa-star" }></i>
                    </button>
                }
              </h5>

              <h6 className="card-subtitle mb-2 text-muted"
                  style={{textAlign: 'right'}}>
                      { this.props.billsDetail.results[0].committeename }
              </h6>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
        {
          <span>
            keyId: {keyId}
          </span>
        }

    </div>
  }
})
