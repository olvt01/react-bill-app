import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/LawList.css';

export const LawListTable = class extends Component {

  highlight = (txt) => {
    let searchTerm = this.props.param_searchKey || '';
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

  isSubscribed = (id) => {
    let m = '';
    if (this.props.userSubscription !=null) {
      this.props.userSubscription.map(s=>{
        if (s.bill_id === id) {
          m= <i className="fas fa-star" />;
        }
        return s
      })
    }
    return m;
  }

  render() {
    return <table style={{width:'98%'}}>
      <tbody>
        <tr>
          <td style={{ width: '600px' }}>법안명</td>
          <td style={{ width: '80px' }}>의안 수</td>
          <td style={{  }}>마지막 수정일</td>
          <td style={{  }}>소관위원회</td>
        </tr>

        { this.props.bills == null || this.props.bills.count === 0 || this.props.committees == null
          ? <tr><td colSpan="4">No item</td></tr>
          : this.props.bills.results.map(item => (
          <tr className="table-row" key={ item.id }>
            <td style={{ textAlign: 'left', paddingLeft: '10px' }}>
              <Link to={`/law/${item.bill}`}>
                { this.highlight(item.bill) }
              </Link>
              <span className='float-right'>
                { this.isSubscribed(item.id) }

              </span>
            </td>
            <td className="">
                { item.count }
            </td>
            <td>
              { item.lastupdated }
            </td>
            <td>
              { this.props.committees.results[item.committee_id-1].committee }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  }
}
