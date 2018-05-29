var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var notifications = require('./routes/notifications');
var topics = require('./routes/topics');

var app = express();

// 配置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 使用 mongoose 连接数据库的一系列配置
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
}; 
mongoose.Promise = global.Promise;

// 连接的 mongodb 数据库地址
mongoose.connect('mongodb://localhost/final', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);

// user api
app.route('/users')
  .get(users.getUsers)
  .post(users.createUser);

app.post('/users/login', users.userLogin);

app.route('/users/:id')
  .get(users.getUser)
  .post(users.updateUser);

// topics api
app.route('/topics')
  .get(topics.getTopics)
  .post(topics.createTopic);

app.route('/topics/:id')
  .post(topics.updateTopic)
  .delete(topics.deleteTopic);

app.post('/topics/:id/updateTitle', topics.updateTopicTitle);

// notification api
app.route('/notifications')
  .get(notifications.getNotifications)
  .post(notifications.createNotification);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
