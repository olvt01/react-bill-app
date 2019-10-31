import React, { Component } from "react";
import { ToggleLink } from "../ToggleLink"
import { BillDisplay } from "./BillDisplay"


export class BillNavigation extends Component {
  render() {
    if (this.props.bills == null || this.props.bills.count === 0) {
        return <h5 className="p-2">No Items</h5>
    }
    return <nav className="navbar navbar-light bg-light">
        <div className="row">
          <form>
            <input
              type="test"
              value="Search..."
            />
          </form>
        </div>
        <div className="row">
          <ToggleLink to={ `${this.props.baseUrl}/all`  } exact={ true }>
              All
          </ToggleLink>
          { this.props.bills.results.map(p =>
              <ToggleLink key={ p.id } to={ `${this.props.baseUrl}/${p.bill}`}>
                  {p.id}. { p.bill }
              </ToggleLink>
          )}
        </div>
      </nav>
  }
}
