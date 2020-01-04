import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AuthWrapper } from "./AuthWrapper";
import { ValidatedForm } from "../forms/ValidatedForm";

export const AuthPrompt = withRouter(AuthWrapper(class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        }
        this.defaultAttrs = { required: true };
        this.formModel = [
            { label: "email", attrs: { label: "이메일" }},
            { label: "password", attrs: { label: "비밀번호", type: "password"} },
        ];
    }

    authenticate = (credentials) => {
        console.log(this.props);
        this.props.authenticate(credentials)
            .catch(err => this.setState({ errorMessage: '이메일 또는 비밀번호가 잘못 되었습니다.' }))
            .then(res => {
              this.props.history.push('/user/mylist');
            });
    }

    render = () =>
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <ValidatedForm formModel={ this.formModel }
                        defaultAttrs={ this.defaultAttrs }
                        submitCallback={ this.authenticate }
                        submitText="Login"
                        cancelCallback={ () => this.props.history.push("/")}
                        cancelText="Cancel"
                        category="로그인"
                        errorMessage={ this.state.errorMessage }
                    />
                </div>
            </div>
        </div>

}))
