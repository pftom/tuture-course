import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './css/Login.css';

const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = (e) => {
    const that = this;

    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {

      try {
        // login http request, POST, 
        const response = await fetch('http://localhost:4000/users/login', {
          body: JSON.stringify({
            ...values,
          }),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        });

        // get the return value with json
        const user = await response.json();

        // set the return user to localStorage (before we use cookie)
        await localStorage.setItem('name', user.name);
        await localStorage.setItem('identity', user.identity);

        // after login success jump to main page
        that.props.handleSuccess();
      } catch (err) {
        console.log(err);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Login);