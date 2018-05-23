const Users = require('../models/users');

const getUsers = (req, res) => {
  Users.find(null, null, (err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
};

const getUser = (req, res) => {
  const { id } = req.params;

  Users.findById({ _id: id }, (err, user) => {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });
}

const updateUser = (req, res) => {
  const { id } = req.params;
  
  Users.updateOne({ _id: id }, { isSelected: true }, (err) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'user updated' });
  });
}

const createUser = (req, res) => {
  let user = Object.assign(new Users(), req.body);

  user.save(err => {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'user created' });
  });
}

const userLogin = (req, res) => {
  console.log('req.body', req.body);
  const { userName } = req.body;
  
  Users.findOne({ userName }, (err, user) => {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  userLogin,
};
