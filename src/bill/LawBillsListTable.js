import React, { Component } from "react";
import { DataTypes } from "../data/Types";
import { Subscription } from "./Subscription";
import '../css/BillList.css';

export const LawBillsListTable = class extends Component {

  highlight = (txt) => {
    let searchTerm = this.props.param_searchKey;
    let searchTermLen = searchTerm.length;
    let idx = txt.indexOf(searchTerm);

    if(idx >= 0) {
      let newText = [txt.substring(0, idx),
        <strong key={idx}>
          {txt.substring(idx, idx + searchTermLen)}
        </strong>,
        txt.substring(idx + searchTermLen)];
      return newText;
    }
    return txt;
  }

  render() {
    return <table style={{width:'98%'}}>
      <tbody>
        <tr>
          <td style={{ width: '80px' }}>의안번호</td>
          <td style={{  }}>제안이유 및 주요내용</td>
          <td style={{ width: '110px' }}>마지막 처리일</td>
          <td style={{ width: '110px' }}>심사진행</td>
          <td style={{ width: '110px' }}>의결결과</td>
        </tr>

        { this.props.bills_detail == null || this.props.bills_detail.count === 0 || this.props.committees == null
          ? <tr><td colSpan="5">No item</td></tr>
          : this.props.bills_detail.results.map(item => (
          <tr className="table-row" key={ item.billno }>
            <td style={{ paddingLeft: '5px' }}>
              <a
                href={`${DataTypes['URL_BILLINFO']}${item.billlink}`}
                target='_blank'
                rel="noopener noreferrer">
                <span id={ item.billno } key={ item.billno }>
                  { item.billno }
                </span>
              </a>
              <span key={ item.billno }>
                <Subscription
                  option='bill'
                  id={ item.billno }/>
              </span>
            </td>
            <td style={{ textAlign: 'left' }}>
              { this.highlight(item.summarycontent) }
            </td>
            <td>
              { item.procdt || item.submitdt || item.proposerdt }
            </td>
            <td>
              { item.billstep }
            </td>
            <td>
              { item.generalresult }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  }
}
