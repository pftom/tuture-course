import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu, Icon, Modal } from 'antd';

import Login from './components/Login';
import Main from './components/Main';
import Notifications from './components/Notifications';
import Topics from './components/Topics';

const Item = Menu.Item;

class App extends Component {
  state = {
    current: 'main',
    visible: false,
    name: '',
    identity: ''
  };

  handleClick = (e) => {
    // 如果此时用户已经登录了，而且又点了 Login，那么提示用户是否要退出登录
    if (this.state.name && e.key === 'login') {
      this.setState({
        visible: true,
      })
    } else {
      // 如果没登录，点了任意键，切换 Menu 到那个组件之下
      // 如果登录了，点了除 login 之外的键，也发生切换
      this.setState({
        current: e.key,
      });
    }
  }

  // after login success, switch to main page
  handleSuccess = () => {
    this.setState({
      current: 'main',
    });
  }

  async getUserToken() {
    const that = this;
    try {
      const name = await localStorage.getItem('name');
      const identity = await localStorage.getItem('identity');

      if (name !== 'undefined') {
        that.setState({
          name,
          identity,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleOk = (e) => {
    // 如果确定退出登录，那么删除 state 里面的 name
    this.setState({
      visible: false,
      name: '',
      identity: '',
    });

    // 同时删除 localStorage 里面的 name
    localStorage.removeItem('name');
    localStorage.removeItem('identity');
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  componentDidMount() {
    this.getUserToken();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.current !== nextState.current) {
      this.getUserToken();
    }
  }

  render() {
    const { name, identity } = this.state;

    const mapKeyToComponent = {
      'main': <Main />,
      'notifications': <Notifications identity={identity}/>,
      'topics': <Topics identity={identity}/>,
      'login': <Login handleSuccess={this.handleSuccess} />,
    };

    return (
      <div className="App">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
        <Item key="main">
        首页
        </Item>
        <Item key="notifications">
        通知
        </Item>
        <Item key="topics">
        科技活动选题
        </Item>
        <Item key="login">
        {
          name ? name : '登录'
        }
        </Item>
        </Menu>

        <Modal
          title="退出登录"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>你确定要退出登录嘛？</p>
        </Modal>

        <div className="content">
        {mapKeyToComponent[this.state.current]}
        </div>
      </div>
    );
  }
}

export default App;