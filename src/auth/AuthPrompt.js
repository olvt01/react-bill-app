import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { authWrapper } from "./AuthWrapper";
import { ValidatedForm } from "../forms/ValidatedForm";

export const AuthPrompt = withRouter(authWrapper(class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        }
        this.defaultAttrs = { required: true };
        this.formModel = [
            { label: "Email", attrs: { defaultValue: "test@testtest.com"}},
            { label: "Password", attrs: { type: "password"} },
        ];
    }

    authenticate = (credentials) => {
        this.props.authenticate(credentials)
            .catch(err => this.setState({ errorMessage: err.message}))
            .then(this.props.history.push("/user"));
    }

    render = () =>
        <div className="container-fluid ">
            <div className="row border justify-content-center">
                <div className="col-md-6">
                    { this.state.errorMessage != null &&
                        <h4 className="bg-danger text-center text-white m-1 p-2">
                            { this.state.errorMessage }
                        </h4>
                    }
                    <ValidatedForm formModel={ this.formModel }
                        defaultAttrs={ this.defaultAttrs }
                        submitCallback={ this.authenticate }
                        submitText="Login"
                        cancelCallback={ () => this.props.history.push("/")}
                        cancelText="Cancel"
                    />
                </div>
            </div>
        </div>
}))
