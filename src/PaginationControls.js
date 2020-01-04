import React, { Component } from "react";
import { PaginationButtons } from "./PaginationButtons";
import { ActionTypes } from "./data/Types";

export class PaginationControls extends Component {

    navigateToPage = (page) => {
      this.props.setParams(ActionTypes.DATA_SET_PAGE, page);
    }

    render() {
        return <div style={{ textAlign:'center' }}>
              <PaginationButtons currentPage={ this.props.param_page || 1 }
                  pageCount={this.props.pageCount || 10}
                  navigate={ this.navigateToPage }/>
        </div>
    }
}
