import React, { Component } from "react";
import { ToggleLink } from "../ToggleLink";
import { AuthWrapper } from "../auth/AuthWrapper";
import "./SideBar.css";

export const SideBar = AuthWrapper(class extends Component {
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

  highlight = (txt) => {
    let idx = txt.indexOf(this.state.delayedSearchTerm);
    if(idx >= 0) {
      let newText = [txt.substring(0, idx),
        <strong>
          {txt.substring(idx, idx + this.state.delayedSearchTerm.length)}
        </strong>,
        txt.substring(idx + this.state.delayedSearchTerm.length)];
      return newText;
    }
    return txt;
  }

  subscribe = (p) => {
    for (let i in this.props.userSubscription) {
      if (p.id===this.props.userSubscription[i].bill_id) {
        return  'True';
      }
    }
    return  'False';
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    if (this.props.bills == null || this.props.bills.count === 0) {
      return <h5 className="p-2">No Items</h5>
    }

    return <div className="sidebar-wrapper">
      <div className="sidebar-top">
        <div className="p-1" style={{textAlign:'center'}}>
          <input
            style={{width: '90%'}}
            placeholder='Search'
            aria-label='Search'
            value={ this.state.searchTerm }
            onChange={ this.onSearchChange }
            onClick={ () => this.setState(() => { return { searchTerm: '', delayedSearchTerm:'' } })  }
            ref={ el => this.input = el }
          />
        </div>
      </div>
      <div className="sidebar">
        <ToggleLink to={ `${this.props.baseUrl}/all` } exact={ true }>
          All
        </ToggleLink>
        {
          this.props.bills.results.filter(p=>
            p.bill.includes(this.state.delayedSearchTerm)
          ).map(p=>
            <ToggleLink key={ p.id } to={ `${this.props.baseUrl}/${p.bill}`}>
              {p.id}. { this.highlight(p.bill) } { this.subscribe(p) }
            </ToggleLink>
          )
        }
      </div>
    </div>
  }
})
