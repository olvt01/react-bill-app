import React, { Component } from "react";
import { Table } from "./Table";

export class BillDisplay extends Component {

  render() {
    if (this.props.bills_detail == null || this.props.bills_detail.count === 0) {
        return <h5 className="p-2">No Products</h5>
    }
    return <div>
      <Table list={ this.props.bills_detail.results } />
      {this.props.bills_detail.results.map(b=>
        <div className="" key={ b.id }>
          <small>
            <a href={ b.billlink }> { b.billno } </a> : { b.billname } { b.billstep }
            { b.coactors } { b.committee } { b.proposerdt } { b.summarycontent }
          </small>
        </div>
      )}
    </div>
  }
}
