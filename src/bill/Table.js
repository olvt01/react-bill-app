import React, { Component } from "react";
// import "./Table.css";

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

export class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

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
      <table className="table">
        <thead className="table-header">
          <tr>
            <th style={{ width: '1px' }}>
                1
            </th>
            <th style={midColumn}>
                2
            </th>
            <th style={largeColumn}>
                3
            </th>
            <th style={largeColumn}>
                4
            </th>
            <th style={smallColumn}>
                5
            </th>
          </tr>
        </thead>
        {this.props.list.map(item =>
            <tr key={item.billno} className="table-row">
              <td style={{ width: '1px' }}>
                <a href={item.billlink}>{item.billno}</a>
              </td>
              <td style={midColumn}>
                {item.proposerdt}
              </td>
              <td style={largeColumn}>
                {item.committeename}
              </td>
              <td style={largeColumn}>
                {item.summarycontent}
              </td>
              <td style={smallColumn}>
                  Dismiss
              </td>
            </tr>
        )}
      </table>
    );
  }
}
