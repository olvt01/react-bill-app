import React, { Component } from "react";
import { ToggleLink } from "../ToggleLink"

export class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bills: null,
      searchTerm: '',
      delayedSearchTerm: ''
    }
    this.timeout =  0;
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value })
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ delayedSearchTerm: this.state.searchTerm })
    }, 700);
  }

  render() {
    if (this.props.bills == null || this.props.bills.count === 0) {
        return <h5 className="p-2">No Items</h5>
    }

    return <nav className="navbar navbar-light bg-light">
        <div className="row">

          <form>
            <input
              placeholder='Search'
              aria-labe='Search'
              value={ this.state.searchTerm }
              onChange={ this.onSearchChange }
              ref={ el => this.input = el }
            />
          </form>
        </div>

        <div className="row">
          <ToggleLink to={ `${this.props.baseUrl}/all` } exact={ true }>
              All
          </ToggleLink>
          {
            this.props.bills.results.filter(p=>
                p.bill.includes(this.state.delayedSearchTerm)
            ).map(p=>
              <ToggleLink key={ p.id } to={ `${this.props.baseUrl}/${p.bill}`}>
                {p.id}. { p.bill }
              </ToggleLink>
            )
          }
        </div>
      </nav>
  }
}
