import React, { Component } from 'react';
import { Button, message, Input,  } from 'antd';

import './css/Notifications.css';

export default class Topics extends Component {
  state = {
    topics: [],
    value: '',
    isEditingTopicId: null,
    iseditingTitle: '',
  };

  handleChange = (e) =>  {
    const target = e.target;

    // target.name = 'title | content'，一个函数为多个 input 反应 value 变化
    this.setState({
      [target.name]: target.value,
    });
  }

  handleDelete = async (topic) => {
    const that = this;
    try {
      await fetch(`http://localhost:4000/topics/${topic._id}`, {
        header: {
          "content-type": "application/json",
        },
        "method": "DELETE",
      });

      message.success('Delete topic successfully');

      const { topics } = that.state;
      const newTopics = topics.filter(oldTopic => oldTopic._id !== topic._id);

      that.setState({
        topics: newTopics,
      });
    } catch (err) {
      message.error('Delete topic error');
    }
  }

  handleEdit = (topic) => {
    this.setState({
      isEditingTopicId: topic._id,
      iseditingTitle: topic.title,
    });
  }

  handleUpdateTopic = async (id) => {
    const that = this;
    const { iseditingTitle } = that.state;
    if (!iseditingTitle) {
      message.error('选题标题不能为空哦~');
    } else {
      try {
        await fetch(`http://localhost:4000/topics/${id}/updateTitle`, {
          body: JSON.stringify({
            title: iseditingTitle,
          }),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        });

        const { topics } = that.state;

        // 在本地更新已经修改的标题
        const newTopics = topics.map(topic => {
          if (topic._id === id) {
            return { ...topic, title: iseditingTitle };
          }

          return topic;
        })

        // 将 isEditingTopicId， iseditingTitle 更新为空
        that.setState({
          isEditingTopicId: '',
          iseditingTitle: '',
          topics: newTopics,
        });
        message.success('选题更新成功！');
      } catch (err) {
        message.error('选题更新失败，请检查问题哦~');
      }
    }
  }

  handleClick = async (e) => {
    // 保存这个片段的 this 到 that， 避免异步导致 this 不匹配
    const that = this;
    const { title } = that.state;

    if (!title) {
      message.error('选题标题不能为空哦~');
    } else {
      try {
        await fetch('http://localhost:4000/topics', {
          body: JSON.stringify({
            title,
          }),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        });

        // 加入数据库成功后，直接加入状态数组
        const { topics } = that.state;
        const newTopics = [{ title, selectedPerson: [] } ].concat(topics);
        that.setState({
          topics: newTopics,
        });
      } catch (err) {
        message.error('添加选题失败！请检查是否遇到问题！');
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.topics !== nextState.topics) {
      this.setState({
        topics: nextState.topics,
      })
    }
  }

  async getTopics() {
    const that = this;
    const response = await fetch('http://localhost:4000/topics');
    const topics = await response.json();

    that.setState({
      topics,
    });
  }

  componentDidMount() {
    this.getTopics();
  }

  render() {
    // 如果这个人的 identity 是 monitor 或者 teacher，那么可以发送通知
    const userArr = ['teacher'];
    
    return (
      <div className="notifications">
        {
          userArr.includes(this.props.identity) && (
            <div className="notification-send">
              <div className="header">发布选题</div>
              <Input type="text" name="title" placeholder="请输入选题" onChange={this.handleChange} value={this.state.title} />
              <Button onClick={this.handleClick}>发布</Button>
            </div>
          )
        }
        {
          this.state.topics.map((topic, key) => (
            <div className="notification-item" key={key} >
              {
                this.state.isEditingTopicId === topic._id
                ? (
                  <div className="notification-header">
                    <div className="notification-header-item">
                      <span>修改话题</span>
                      <Input name="iseditingTitle" value={this.state.iseditingTitle} onChange={this.handleChange}/>
                    </div>
                    <div className="notification-header-item">
                      <Button type="primary" onClick={() => { this.handleUpdateTopic(topic._id); }}>确定</Button>
                    </div>
                  </div>
                ) : (
                  <div className="notification-header">
                    <div className="notification-header-item">{topic.title}</div>
                    <div className="notification-header-item">
                      <Button type="danger" onClick={() => { this.handleDelete(topic) }}>删除选题</Button>
                      <Button type="primary" onClick={() => { this.handleEdit(topic) }}>编辑选题</Button>
                    </div>
                  </div>
                )
              }
              {
                topic.selectedPerson.map((person, key) => (
                  <div className="notification-content" key={key}>{person}</div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}