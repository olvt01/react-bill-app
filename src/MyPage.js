import React, { Component } from "react";
import { CombinedContextWrapper } from "./CombinedContextWrapper";
import { ValidatedForm } from "./forms/ValidatedForm";
import './css/MyPage.css';

export const MyPage = CombinedContextWrapper(class extends Component {

  constructor(props) {
      super(props);
      this.state = {
          errorMessage: null
      }
      this.defaultAttrs = { required: true };
      this.formModel = [
          { label: "Email", attrs: { label: '이메일', defaultValue: "", disabled: true}},
          { label: "Name", attrs: { label: '이름', defaultValue: ""} },
          { label: "Password_current", attrs: { label: '현재 비밀번호', type: "password"} },
          { label: "Password", attrs: { label: '새로운 비밀번호', type: "password"} },
          { label: "Password_Check", attrs: { label: '새로운 비밀번호 (확인)', type: "password"} },
      ];
  }

  updateUserData = (credentials) => {
    delete credentials.email;
    delete credentials.password_current;
    delete credentials.password_check;
    this.props.updateUserData(this.props.webToken, credentials)
      .catch(err => this.setState({ errorMessage: '비밀번호를 확인해주세요' }))
      .then(response => {
        if (response && response.status === 200) {
          alert('회원 정보가 변경되었습니다.')
          this.props.history.push('/user/mylist');
        }
      });
  }

  updateUserInfo = (credentials) => {
    if (credentials.password !== credentials.password_check) {
      this.setState({ errorMessage: '새로운 비밀번호가 일치하지 않습니다.'})
    } else {
      const credentials_current = {
        email: credentials.email,
        password: credentials.password_current
      }
      this.props.authenticate(credentials_current)
        .catch(err => this.setState({ errorMessage: '예전 비밀번호가 일치하지 않습니다.' }))
        .then(this.updateUserData(credentials));
    }
  }

  render = () => {
    if (this.props.userInfo != null) {
      this.formModel[0].attrs.defaultValue = this.props.userInfo.email;
      this.formModel[1].attrs.defaultValue = this.props.userInfo.name;
    }

    return  <div className="container-fluid" style={{ backgroundColor: 'white'}}>
          <div className="row border justify-content-center">
              <div className="col-md-6">
                  <ValidatedForm formModel={ this.formModel }
                      defaultAttrs={ this.defaultAttrs }
                      submitCallback={ this.updateUserInfo }
                      submitText="수정"
                      cancelCallback={ () => this.props.history.push("/")}
                      cancelText="취소"
                      category="회원정보수정"
                      errorMessage={ this.state.errorMessage }
                  />
              </div>
          </div>
      </div>
  }
})
