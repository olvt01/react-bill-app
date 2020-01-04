import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = dataStore => dataStore;
const mapDispatchToProps = { };

const mergeProps = (dataStore, actionCreators, router) => ({
    ...dataStore, ...router, ...actionCreators})

export const PageConnector = (PageComponent) =>
    withRouter(connect(mapStateToProps, mapDispatchToProps,
        mergeProps)(PageComponent))
