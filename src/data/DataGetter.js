import React, { Component } from "react";
import { DataTypes } from "./Types";

export class DataGetter extends Component {

    render() {
        return <React.Fragment>{ this.props.children }</React.Fragment>
    }

    componentDidUpdate = () => this.getData();

    getData = () => {
        if (this.props.match.params.category &&
            this.props.match.params.category !== 'all') {
            console.log(this.props.match.params.category);

            try
              {
                const billid = this.props.bills.results.filter(p =>
                    p.bill === this.props.match.params.category
                )[0].id;

                if (this.props.bills_detail_params == null ||
                    this.props.bills_detail.results[0].billid !== billid) {
                        this.props.loadData(DataTypes.BILLS_DETAIL, {id: billid});
                }
            } catch(err) {
                console.log("category doesn't match");
            }

        }
        else {
        }
    }
}
