import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ActionTypes } from "../data/Types";
import { SearchMain } from "./SearchMain";
import '../css/Home.css';

export class Home extends Component {

  moreDate = () => {
    this.props.setParams(ActionTypes.DATA_SET_PAGE, this.props.bills_cover_params.page+1)
  }

  componentDidMount() {
    this.props.setDefaultParams();
  }

  componentWillUnmount() {
    this.props.setClearDataStore('bills_cover_results', [])
    this.props.setClearDataStore('bills_cover_params', {})
  }

  render() {
    return <div className="home">
      <div className='search'>
        <SearchMain {...this.props}/>
      </div>
      <div className="grid-container">
        { this.props.bills_cover && this.props.committees
          ? this.props.bills_cover_results.map(item=>(
            <div key={item.billno}>
              <div className="billno">
                    { item.billno }
              </div>
              <div className="billname">
                <Link
                  className="link"
                  to={`/law/${item.billname.replace(' 일부개정법률안','').replace(' 전부개정법률안', '')}`
                  }>
                  { item.billname }
                </Link>
              </div>
              <div className="billcommittee">
                { this.props.committees.results[item.committee_id-1].committee }
              </div>
              <div className="billetc">
                <span>{ item.billstep }</span>
                <span style={{float:'right'}}>{ item.lastupdated }</span>
              </div>

            </div>
          ))
        : null
        }

      </div>
      <div className="text-center m-4" style={{border: 'none'}}>
        <button className="btn border" onClick={ this.moreDate }>+</button>
      </div>
    </div>
  }
}
