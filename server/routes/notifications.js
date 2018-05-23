const Notifications = require('../models/notifications');

const getNotifications = (req, res) => {
  Notifications.find(null, null, (err, notifications) => {
    if (err) {
      res.send(err);
    }

    res.json(notifications);
  });
}

const createNotification = (req, res) => {
  console.log('req.body', req.body);
  let newNotification = Object.assign(new Notifications(), req.body);
  console.log('newNotification', newNotification);

  newNotification.save((err, notification) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Notification created successfully' });
  });
}

module.exports = {
  getNotifications,
  createNotification,
};