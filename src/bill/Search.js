import React, { Component } from "react";
import { LawListTable } from "./LawListTable";
import { BillListTable } from "./BillListTable";
import { SearchMain } from "./SearchMain";
import { PageConnector } from "./PageConnector";
import { PaginationControls } from "../PaginationControls";
import '../css/Search.css';

const Pages = PageConnector(PaginationControls);

export class Search extends Component {

  renderSearchedResults = () => {
    if(this.props.match!=null) {
     switch(this.props.match.params.category) {
      case 'law':
        return <React.Fragment>
          {
            this.props.bills == null || this.props.bills.count === 0 ||
            this.props.committees == null
              ? ''
              : <Pages {...this.props }
                  pageCount={Math.ceil(this.props.bills_total/(this.props.bills_params.page_size || 10))}/>

          }
          <LawListTable {...this.props}/>
          {
            this.props.bills == null || this.props.bills.count === 0 ||
            this.props.committees == null
              ? ''
              : <Pages {...this.props }
                  pageCount={Math.ceil(this.props.bills_total/(this.props.bills_params.page_size || 10))}/>

          }
        </React.Fragment>
      case 'bill':
        return <React.Fragment>
          {
            this.props.bills_detail == null || this.props.bills_detail.count === 0 || this.props.committees == null
              ? ''
              : <Pages {...this.props }
                  pageCount = { Math.ceil(this.props.bills_detail_total/parseInt(this.props.bills_detail_params.page_size)) }/>
          }
          <BillListTable {...this.props}/>
          {
            this.props.bills_detail == null || this.props.bills_detail.count === 0 || this.props.committees == null
              ? ''
              : <Pages {...this.props }
                  pageCount = { Math.ceil(this.props.bills_detail_total/parseInt(this.props.bills_detail_params.page_size)) }/>
          }
        </React.Fragment>
      default:
        return null
    }}
  }
  render() {
    return <React.Fragment>
      <div className="top">
        <SearchMain {...this.props} />
      </div>
      <div className="searchBill">
        {this.renderSearchedResults()}
      </div>
    </React.Fragment>
  }
}
