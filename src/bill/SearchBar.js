import React, { Component } from "react";
import { ActionTypes } from "../data/Types";

export const SearchBar = class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        searchTerm: '',
      }
    }

    handleKeyDown = (ev) => {
      if (ev.key === 'Enter') {
        this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
        this.props.setParams(ActionTypes.DATA_SET_SEARCH_PROPERTY, ev.target.value);
      }
    }

    onSearchChange = (event) => {
      this.setState({ searchTerm: event.target.value })
    }

    render() {
      return <div className='top'>
          <input
            style={{ width: '300px', fontSize:'18px'}}
            placeholder='Search'
            value={ this.state.searchTerm }
            onChange={ this.onSearchChange }
            onKeyDown={this.handleKeyDown }
            ref={ el => this.input = el }/>
          { ` 총 ${this.props.count} 개 법안`}
      </div>
    }
}
