import React, { Component } from 'react';
import { Button, message, Input,  } from 'antd';

import './css/Notifications.css';

export default class Notifications extends Component {
  state = {
    notifications: [],
    value: '',
    content: '',
  };

  handleChange = (e) => {
    const target = e.target;

    // target.name = 'title | content'，一个函数为多个 input 反应 value 变化
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick = async (e) => {
    // 保存这个片段的 this 到 that， 避免异步导致 this 不匹配
    const that = this;
    const { title, content } = that.state;

    if (!title || !content) {
      message.error('通知标题或内容不能为空哦~');
    } else {
      try {
        await fetch('http://localhost:4000/notifications', {
          body: JSON.stringify({
            title,
            content
          }),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        });

        // 加入数据库成功后，直接加入状态数组
        const { notifications } = that.state;
        const newNotifications = [{ title, content} ].concat(notifications);
        that.setState({
          notifications: newNotifications,
        });
      } catch (err) {
        message.error('添加通知失败！请检查是否遇到问题！');
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.notifications !== nextState.notifications) {
      this.setState({
        notifications: nextState.notifications,
      })
    }
  }

  async getNotifications() {
    const that = this;
    const response = await fetch('http://localhost:4000/notifications');
    const notifications = await response.json();

    that.setState({
      notifications,
    });
  }

  componentDidMount() {
    this.getNotifications();
  }

  render() {
    // 如果这个人的 identity 是 monitor 或者 teacher，那么可以发送通知
    const userArr = ['monitor', 'teacher'];
    
    return (
      <div className="notifications">
        {
          userArr.includes(this.props.identity) && (
            <div className="notification-send">
              <div className="header">发布通知</div>
              <Input type="text" name="title" placeholder="请输入通知标题" onChange={this.handleChange} value={this.state.title} />
              <Input.TextArea type="text" name="content" onChange={this.handleChange} value={this.state.content} />
              <Button onClick={this.handleClick}>发布</Button>
            </div>
          )
        }
        {
          this.state.notifications.map((notification, key) => (
            <div className="notification-item" key={key} >
              <div className="notification-header">{notification.title}</div>
              <div className="notification-content">{notification.content}</div>
            </div>
          ))
        }
      </div>
    );
  }
}