import React, { Component } from "react";
import { ActionTypes } from "../data/Types";
import { OptionControls } from "./OptionControls";
import { PageConnector } from "./PageConnector";
import { PaginationControls } from "../PaginationControls";
import { SearchBar } from "./SearchBar";
import { BillListTable } from "./BillListTable";
import '../css/BillList.css';

const BillListPages = PageConnector(PaginationControls);

export const BillList = class extends Component {

    componentDidMount() {
      this.props.setDefaultParams();
    }

    handleBillStepChange = (ev) => {
      this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
      this.props.setParams(ActionTypes.DATA_SET_BILLSTEP, ev.target.value);
    }

    handleGeneralResultChange = (ev) => {
      this.props.setParams(ActionTypes.DATA_SET_PAGE, 1);
      this.props.setParams(ActionTypes.DATA_SET_GENERALRESULT, ev.target.value);
    }

    render() {
      const sortKeys = [
        {key:'billno', s:'의안번호'},
        {key:'billname', s:'의안명'},
        {key:'lastupdated', s:'마지막 수정일'}
      ]

      const billstepFinished = [
        {id:'', value:'ALL'},
        {id:'접수', value:'접수'},
        {id:'본회의 심의', value:'본회의 심의'},
        {id:'정부 이송', value:'정부 이송'},
        {id:'공포', value:'공포'},
        {id:'대안반영폐기', value:'대안반영폐기'},
        {id:'부결', value:'부결'},
        {id:'철회', value:'철회'},
        {id:'폐기', value:'폐기'}
      ]

      const billstepMooring = [
        {id:'', value:'ALL'},
        {id:'접수', value:'접수'},
        {id:'위원회 심사', value:'위원회 심사'},
        {id:'체계자구 심사', value:'체계자구 심사'}
      ]

      const generalresults = [
        {id:'', value:'ALL'},
        {id:'원안가결', value:'원안가결'},
        {id:'수정가결', value:'수정가결'},
        {id:'대안반영폐기', value:'대안반영폐기'},
        {id:'부결', value:'부결'},
        {id:'철회', value:'철회'},
        {id:'폐기', value:'폐기'}
      ]

      const selector = [
        { selector: '심사진행',
          initValue: this.props.param_billstep || billstepFinished[0],
          values: this.props.match.params.category==='finished' ? billstepFinished : billstepMooring,
          onChange: this.handleBillStepChange,
        },
        { selector: '의결결과',
          initValue: this.props.param_generalresult || generalresults[0],
          values: generalresults,
          onChange: this.handleGeneralResultChange,
        }
      ]

      return <React.Fragment>
        <SearchBar setParams={this.props.setParams} count={this.props.bills_detail_total} />

        <div className='billList'>
          {
            this.props.bills_detail == null || this.props.bills_detail.count === 0 || this.props.committees == null
              ? ''
              : <BillListPages {...this.props }
                  pageCount = { Math.ceil(this.props.bills_detail_total/parseInt(this.props.bills_detail_params.page_size)) }/>
          }
            <OptionControls  {...this.props }
                selector = { selector }
                sortKeys = { sortKeys }/>
            <BillListTable {...this.props } />

          {
            this.props.bills_detail == null || this.props.bills_detail.count === 0 || this.props.committees == null
              ? ''
              : <BillListPages {...this.props }
                  pageCount = { Math.ceil(this.props.bills_detail_total/parseInt(this.props.bills_detail_params.page_size)) }/>
          }
        </div>
      </React.Fragment>
    }
  }
