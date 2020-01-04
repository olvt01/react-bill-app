import React, { Component } from "react";
import './css/PaginationButtons.css';

export class PaginationButtons extends Component {

    getPageNumbers = () => {
        const currentFloor = Math.floor(this.props.currentPage/10-0.01)
        const lastFloor = Math.floor(this.props.pageCount/10-0.01)

        if (lastFloor < 1) {
            return [...Array(this.props.pageCount+1).keys()].slice(1);
        } else if (currentFloor === lastFloor) {

            return [...Array((this.props.pageCount-lastFloor*10)+1).keys()].slice(1)
                .map(v => v + currentFloor*10);
        } else {
            return [...Array(10+1).keys()].slice(1)
                .map(v => v + currentFloor*10);
        }
    }

    render() {
        const current = this.props.currentPage;
        const pageCount = this.props.pageCount;
        const navigate = this.props.navigate;

        return <React.Fragment>
            <span className={`button ${current === 1
              ? "button-disabled": "" }`}
              onClick={ current === 1
                ? null : () => navigate(1)}>
              <i className="fas fa-angle-double-left"></i>
            </span>
            <span className={`button ${current === 1
              ? "button-disabled": "" }`}
              onClick={ current === 1
                ? null : () => navigate(current-1)}>
              <i className="fas fa-angle-left"></i>
            </span>

            { pageCount && this.getPageNumbers().map(num =>
                <span className={ `button ${num === current
                        ? "button-current": ""}`}
                    onClick={ () => navigate(num)} key={ num }>
                        { num }
                </span>
              )}

            <span className={`button ${current === pageCount
              ? "button-disabled": "" }`}
              onClick={ current === pageCount
                ? null : () => navigate(current+1)}>
              <i className="fas fa-angle-right"></i>
            </span>

            <span className={`button ${current === pageCount
              ? "button-disabled": "" }`}
              onClick={ current === pageCount
                ? null : () => navigate(pageCount)}>
              <i className="fas fa-angle-double-right"></i>
            </span>
        </React.Fragment>
    }
}
