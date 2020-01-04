import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AuthWrapper } from "./AuthWrapper";
import { ValidatedForm } from "../forms/ValidatedForm";

export const AuthSignUpPrompt = withRouter(AuthWrapper(class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        }
        this.defaultAttrs = { required: true };
        this.formModel = [
            { label: "email", attrs: { label: "이메일", defaultValue: ""}},
            { label: "name", attrs: { label: "이름", defaultValue: ""} },
            { label: "password", attrs: { label: "비밀번호(8자리 이상)", type: "password"} },
        ];
    }

    signup = (credentials) => {
        this.props.signup(credentials)
            .catch(err => this.setState({ errorMessage: '이메일 또는 비밀번호가 잘못 되었습니다.' }))
            .then(res => {
              if(res) {
                this.props.history.push('/home')
              }
            });
    }

    render = () =>
        <div className="container-fluid ">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <ValidatedForm formModel={ this.formModel }
                        defaultAttrs={ this.defaultAttrs }
                        submitCallback={ this.signup }
                        submitText="SignUp"
                        cancelCallback={ () => this.props.history.push("/")}
                        cancelText="Cancel"
                        category="회원가입"
                        errorMessage={ this.state.errorMessage }
                    />
                </div>
            </div>
        </div>
}))
