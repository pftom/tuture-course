import React, { Component } from 'react';
import './css/Main.css';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="Main-Item">
          <div className="header">课程介绍</div>
          <div className="content"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis hic facilis porro ea assumenda possimus doloribus quos culpa vitae quae!</div>
        </div>
        <div className="Main-Item">
          <div className="header">教学目的</div>
          <div className="content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis hic facilis porro ea assumenda possimus doloribus quos culpa vitae quae!</div>
        </div>
        <div className="Main-Item">
          <div className="header">参考资料</div>
          <div className="content">
            <div className="content-item">
              <div className="content-header">视频资源</div>
              <div className="content-anchor"><a href="#">麻省理工公开课：电和磁</a></div>
              <div className="content-anchor"><a href="#">壹课堂公开课：北京大学xxx</a></div>
            </div>
            <div className="content-item">
              <div className="content-header">课件下载</div>
              <div className="content-anchor"><a href="#">麻省理工公开课：电和磁</a></div>
              <div className="content-anchor"><a href="#">壹课堂公开课：北京大学xxx</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}