import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Axios from "axios";
import { AuthWrapper } from "../auth/AuthWrapper";
import { DataTypes } from "../data/Types";
import { AuthUrls } from "../data/Urls";
import { SideBar } from "./SideBar";

export default AuthWrapper(class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        bills: null,
      }
    }
    render() {
      if (this.state.bills==null) {
        return <div>...Loading</div>
      }
      return <div className="container-fluid border">
        <div className="row">
          <div className="col-12 col-md-3 col-xl-2 bd-sidebar">
            <SideBar baseUrl="/bill" bills={ this.state.bills } />
          </div>
          <div className="col-12 col-md-3 col-xl-2 bd-sidebar">
            { this.state.bills.results.map(p=>
                p.bill
            )}
          </div>
          <div className="col-12 col-md-9  border">
            YES
          </div>
        </div>
      </div>
    }

    componentDidMount = () => {
      Axios.get(AuthUrls[DataTypes.USER_SUBSCRIPTION],
        { headers: {"Authorization" : `TOKEN ${this.props.webToken}`} }).then(response => {
          if (response.data) {
                response.data.results = response.data.results.map(p=> ({
                  'id': p.id,
                  'bill_id': p.subscribe_bill.bill_id,
                  'bill': p.subscribe_bill.bill_name
                }))
              this.setState({ bills: response.data })
          }
          else {
              this.setState({ bills: 2 });
          }
      })
    }
})
