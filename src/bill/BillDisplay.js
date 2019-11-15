import React, { Component } from "react";
import { Table } from "./Table";
import { BillInfo } from "./BillInfo";

export class BillDisplay extends Component {

  render() {
    if (this.props.bills_detail == null || this.props.bills_detail.count === 0) {
        return <h5 className="p-2">No Products</h5>
    }
    return <div className="">
      <BillInfo
        billsDetail={ this.props.bills_detail }
        userSubscription={this.props.user_subscription} { ...this.props }
      />
      <Table
        list={ this.props.bills_detail.results }
        resizable={true}
        resizerOptions={{}}
      />
    </div>
  }
}
