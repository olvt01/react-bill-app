import React, { Component } from "react";
import { ActionTypes } from "../data/Types";
import { OptionControls } from "./OptionControls";
import { PageConnector } from "./PageConnector";
import { PaginationControls } from "../PaginationControls";
import { LawListTable } from "./LawListTable";
import { SearchBar } from "./SearchBar";
import '../css/LawList.css';

const LawListPages = PageConnector(PaginationControls);

export const LawList = class extends Component {

    handleCommitteeChange = (ev) => {
      this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
      this.props.setParams(ActionTypes.DATA_SET_COMMITTEE, ev.target.value);
    }

    componentDidMount() {
      this.props.setDefaultParams();
    }

    render() {
      const sortKeys = [
        {key:'bill', s:'법안명'},
        {key:'count', s:'의안 수'},
        {key:'lastupdated', s:'마지막 수정일'}
      ];
      let selector;

      if (this.props.committees != null) {
        const committees = [{id:'', value:'ALL'}]
          .concat(this.props.committees.results.filter(c=> c.bills.length > 0)
          .map(c=> ({ id: c.id, value: c.committee })
          ))

        selector = [
          { selector: '소관위원회',
            initValue: this.props.param_committee || committees[0],
            values: committees,
            onChange: this.handleCommitteeChange,
          }
        ]
      }

      return <React.Fragment>
        <SearchBar setParams={this.props.setParams} count={this.props.bills_total} />
        <div className='lawList'>
          {
            this.props.bills == null || this.props.bills.count === 0 ||
            this.props.committees == null || selector == null
              ? ''
              : <LawListPages {...this.props }
                  pageCount={Math.ceil(this.props.bills_total/(this.props.bills_params.page_size || 10))}/>

          }
            <OptionControls {...this.props }
              sortKeys={sortKeys}
              selector={selector}/>
            <LawListTable {...this.props} />

          {
            this.props.bills == null || this.props.bills.count === 0 ||
            this.props.committees == null || selector == null
              ? ''
              : <LawListPages {...this.props }
                  pageCount={Math.ceil(this.props.bills_total/(this.props.bills_params.page_size || 10))}/>

          }
        </div>
      </React.Fragment>
    }
  }
