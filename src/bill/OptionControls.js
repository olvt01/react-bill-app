import React, { Component } from "react";
import { ActionTypes } from "../data/Types";
import '../css/OptionControls.css';

export class OptionControls extends Component {
    constructor(props) {
        super(props);
        this.pageSizes = this.props.sizes || [10, 20, 50, 100];
        this.sortKeys = this.props.sortKeys ;
    }

    handlePageSizeChange = (ev) => {
        this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
        this.props.setParams(ActionTypes.DATA_SET_PAGESIZE, ev.target.value);
    }

    handleSortPropertyChange = (ev) => {
        this.props.setParams(ActionTypes.DATA_SET_SORT_PROPERTY, ev.target.value);
        this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
    }

    handleCommitteeChange = (ev) => {
        this.props.setParams(ActionTypes.DATA_SET_COMMITTEE, ev.target.value);
        this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
    }

    render() {
        return <div style={{margin: '1%', paddingBottom:'0px'}}>
          { '정렬기준: ' }
          <select
                  onChange={ this.handleSortPropertyChange }
                  value={ this.props.param_sortKey ||
                    this.sortKeys[0] }>
              { this.sortKeys.map(s =>
                  <option value={s.key} key={s.key}>{s.s}</option>
              )}
          </select>

          <span style={{float:'right'}}>
            {
              this.props.selector && this.props.selector.map(s=> (
                <span className='selector' key={s.selector}>
                  { s.selector } {': '}
                  <select
                    onChange= { s.onChange }
                    value={ s.initValue }>
                    { s.values.map(c =>
                      <option value={c.id} key={c.id}>
                        { c.value }
                      </option>
                    )}
                  </select>
                </span>
              ))
            }

            <span className='selector'>
              { '페이지당 결과 수: ' }
              <select
                      onChange={ this.handlePageSizeChange }
                      value={ this.props.param_pageSize || this.pageSizes[0] }>
                  { this.pageSizes.map(s =>
                      <option value={s} key={s}>{s}개</option>
                  )}
              </select>
            </span>

          </span>
        </div>
    }
}
