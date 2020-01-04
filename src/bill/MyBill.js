import React, { Component } from "react";
import { CombinedContextWrapper } from "../CombinedContextWrapper";
import { ActionTypes } from "../data/Types";
import { BillList } from "./BillList";
import "../css/User.css";

export const MyBill = CombinedContextWrapper(class extends Component {

    componentDidUpdate() {
      if (this.props.userBookmark.length > 0) {
        let ids ='';
        this.props.userBookmark.map(i=>(
          ids = ids + `,${i.bookmark.billno}`
        ))

        if (this.props.param_billno !== ids.substring(1)) {
          this.props.setParams(ActionTypes.DATA_SET_BILLNO, ids.substring(1));
        }
      }
    }

    componentDidMount() {
      this.props.setDefaultParams();
    }

    render() {
      if (this.props.bills == null || this.props.userBookmark == null) {
        return <div>...Loading</div>
      }

      if (this.props.userBookmark.length === 0) {
        return <div> No Item </div>
      }

      return <BillList {...this.props} />
    }
})
