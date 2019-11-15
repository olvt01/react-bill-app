import React, { Component } from "react";
import ReactDOM from "react-dom";
import ColumnResizer from "column-resizer";
import "./Table.css";


export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };
    this.tableSelector = "#somethingUnique";
  }

  componentWillUnmount() {
    if (this.props.resizable) {
      this.disableResize();
    }
  }

  componentDidUpdate() {
    if (this.props.resizable) {
        this.enableResize();
    }
  }

  componentWillUpdate() {
    if (this.props.resizable) {
        this.disableResize();
    }
  }

  enableResize = () => {
    const options = this.props.resizerOptions;
    // options.widths=['10%','20%','20%','40%','10%'];
    // options.disabledColumns=[0];
    if (!this.resizer) {
        this.resizer = new ColumnResizer(this.node, options);
    } else {
        this.resizer.reset(options);
    }
  }

  disableResize = () => {
    if (this.resizer) {
        this.resizer.reset({ disable: true });
    }
  }

  onSort = (sortKey) => {
    const isSortReverse = this.state.sortKey === sortKey &&
      !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  }

  render() {

    const {
      sortKey,
      isSortReverse
    } = this.state;

    // const sortedList = SORTS[this.state.sortKey](this.props.list);
    // const reverseSortedList = this.state.isSortReverse
    //   ? sortedList.reverse()
    //   : sortedList;

    return (
      <table
        className="table-sm"
        ref={(n) => this.node = n}
      >
        <thead>
          <tr className="sticky">
            <th style={{ width: '90px' }}>의안번호</th>
            <th style={{ width: '110px' }}>제안일</th>
            <th>주요내용 및 제안이유</th>
            <th>기타</th>
          </tr>
        </thead>
        <tbody>
          {this.props.list.map(item =>
            <tr key={item.billno} >
              <td>
                <a href={item.billlink}>{item.billno}</a>
              </td>
              <td>
                {item.proposerdt}
              </td>
              <td className="td-summarycontent">
                {item.summarycontent}
              </td>
              <td>
                A
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
