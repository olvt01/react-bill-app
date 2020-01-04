import React, { Component } from "react";
import { DataTypes, ActionTypes } from "./Types";

export class DataGetter extends Component {
    render() {
        return <React.Fragment>{ this.props.children }</React.Fragment>
    }

    componentDidMount = () => {
      console.log('')
    }
    componentDidUpdate = () => {
      this.dataLoader();
    }

    dataLoader = () => {
      switch(this.props.match.params.section) {
        case "home":
          this.getBillCoverData('');
          break;
        case "law":
          if (this.props.match.params.category!=null) {
            this.getLawBillsData(this.props.match.params.category)
          } else {
            this.getLawData();
          }
          break;
        case "bill":
          switch(this.props.match.params.category) {
            case "finished":
              this.props.setParams(ActionTypes.DATA_SET_FINISHED, 1);
              this.getBillData(1);
              break;
            case "mooring":
              this.props.setParams(ActionTypes.DATA_SET_FINISHED, 0);
              this.getBillData(0);
              break;
            default:
              return this.props.history.push('/bill/finished')
          }
          break;
        case "user":
          switch(this.props.match.params.category) {
            case "mylist":
              this.getLawData();
              break;
            case "mybill":
              this.props.setParams(ActionTypes.DATA_SET_FINISHED, '');
              this.getBillData('');
              break;
            default:
              return null
          }
          break;
        case "search":
          switch(this.props.match.params.category) {
            case "law":
              this.getLawData();
              break;
            case "bill":
              this.props.setParams(ActionTypes.DATA_SET_FINISHED, '');
              this.getBillData('');
              break;
            case "mooring":
              this.props.setParams(ActionTypes.DATA_SET_FINISHED, 0);
              this.getBillData(0);
              break;
            default:
              return this.props.history.push('/search/law')
          }
          break;
        default:
          return this.props.history.push('/home')
      }
    }

    getLawBillsData = (bill) => {
      this.props.setBill(bill);
      if (this.props.param_bill_name ==null || this.props.param_bill_name !==bill) {
        return;
      }

      const dsData = this.props.bills_detail_params || {} ;
      const rtData = {
          page_size: this.props.param_pageSize || 10,
          page: this.props.param_page || 1,
          billstep: this.props.param_billstep || "",
          billno: this.props.param_billno || "",
          generalresult: this.props.param_generalresult || "",
          sortKey: this.props.param_sortKey || "billno",
          search: this.props.param_searchKey || "",
          bill: this.props.param_bill || -1
      }

      if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
          this.props.loadData(DataTypes.BILLS_DETAIL, rtData);
      }
    }

    getLawData = () => {
        const dsData = this.props.bills_params || {} ;
        const rtData = {
            page_size: this.props.param_pageSize || 10,
            page: this.props.param_page || 1,
            committee: this.props.param_committee,
            sortKey: this.props.param_sortKey || "bill",
            search: this.props.param_searchKey || "",
            id: this.props.param_id || ""
        }

        if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
            this.props.loadData(DataTypes.BILLS, rtData);
        }
    }

    getBillData = (boolean) => {
        if (this.props.param_finished ==null || this.props.param_finished !== boolean) {
          return;
        }

        const dsData = this.props.bills_detail_params || {} ;
        const rtData = {
            page_size: this.props.param_pageSize || 10,
            page: this.props.param_page || 1,
            billstep: this.props.param_billstep || "",
            billno: this.props.param_billno || "",
            generalresult: this.props.param_generalresult || "",
            sortKey: this.props.param_sortKey || "",
            finished: this.props.param_finished,
            search: this.props.param_searchKey || "",
        }

        if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
            this.props.loadData(DataTypes.BILLS_DETAIL, rtData);
        }
    }

    getBillCoverData = () => {
        const dsData = this.props.bills_cover_params || {} ;
        const rtData = {
            page_size: this.props.param_pageSize || 10,
            page: this.props.param_page || 1,
        }

        if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
            this.props.loadData(DataTypes.BILLS_COVER, rtData);
        }
    }
}
