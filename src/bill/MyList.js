import React, { Component } from "react";
import { CombinedContextWrapper } from "../CombinedContextWrapper";
import { ActionTypes } from "../data/Types";
import { LawList } from "./LawList";
import "../css/User.css";

export const MyList = CombinedContextWrapper(class extends Component {

    componentDidUpdate() {
      if (this.props.userSubscription.length > 0) {
        let ids ='';
        this.props.userSubscription.map(i=>(
          ids = ids + `,${i.bill_id}`
        ))

        if (this.props.param_id !== ids.substring(1)) {
          this.props.setParams(ActionTypes.DATA_SET_ID, ids.substring(1));
        }
      }
    }

    componentDidMount() {
      this.props.setDefaultParams();
    }

    render() {
      if (this.props.bills == null || this.props.userSubscription == null) {
        return <div>...Loading</div>
      }

      if (this.props.userSubscription.length === 0) {
        return <div> No Item </div>
      }

      return <LawList {...this.props} />
    }
})
