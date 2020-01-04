import React, { Component } from "react";
import { ActionTypes } from "../data/Types";

export const SearchMain = class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        searchTerm: '',
        value: null
      }
      this.values = [
        {id:'law', value:'법안명'},
        {id:'bill', value:'의안내용'},
      ]
    }

    handleKeyDown = (ev) => {
      if (ev.key === 'Enter') {
        this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
        this.props.setParams(ActionTypes.DATA_SET_SEARCH_PROPERTY, ev.target.value);
        switch(this.state.value) {
          case 'law':
            return this.props.history.push('/search/law')
          case 'bill':
            return this.props.history.push('/search/bill')
          default:
            return this.props.history.push('/search/law')
        }
      }
    }

    onSearchChange = (event) => {
      this.setState({ searchTerm: event.target.value })
    }

    onChange = (ev) => {
      this.setState({value: ev.target.value})
    }

    onSearchChange = (event) => {
      this.setState({ searchTerm: event.target.value })
    }

    componentDidMount() {
      this.setState({ value: this.values[0].id })
      if (this.input) {
        this.input.focus();
      }
    }

    render() {
      return <div >
        <span className="selector">
          <select
            onChange= { this.onChange }
            value={ this.state.value || this.values[0] }>
            { this.values.map(c =>
              <option value={c.id} key={c.id}>
                { c.value }
              </option>
            )}
          </select>
        </span>
        <span>
          <input
            placeholder='검색'
            value={ this.state.searchTerm }
            onChange={ this.onSearchChange }
            onKeyDown={this.handleKeyDown}
            ref={ el => this.input = el }/>
        </span>

      </div>
    }
}
