const Topics = require('../models/topics');
const Users = require('../models/users');

const getTopics = (req, res) => {
  Topics.find(null, null, (err, topics) => {
    if (err) {
      res.send(err);
    }

    res.json(topics);
  });
};

const createTopic = (req, res) => {
  let newTopic = Object.assign(new Topics(), req.body);

  newTopic.save((err, topic) => {
    if (err) {
      res.send(err);
    }
    res.json(topic);
  });
}

const updateTopic = async (req, res) => {
  const { id } = req.params;
  
  const topic = await Topics.findById({ _id: id });
  const { selectedPerson } = topic;

  const { person } = req.body;
  const newSelectedPerson = selectedPerson.concat(person);

  try {
    await Topics.updateOne({ _id: id }, { selectedPerson: newSelectedPerson });
    await Users.updateOne({ name: person }, { isSelected: true });
    res.json({ message: 'Successfully updated' });
  } catch (err) {
    res.send(err);
  }
}

const updateTopicTitle = async (req, res) => {
  const { id } = req.params;

  const { title } = req.body;
  console.log('title', title);

  try {
    const topic = await Topics.updateOne({ _id: id }, { title: title });
    res.json({ message: 'Successfully updated title' });
  } catch (err) {
    res.send(err);
  }
}

const deleteTopic = async (req, res) => {
  const { id } = req.params;

  const topic = await Topics.findOne({ _id: id });

  const { selectedPerson } = topic;

  if (Array.isArray(selectedPerson)) {
    await selectedPerson.map(async (person) => {
      try {
        await Users.updateOne({ name: person }, { isSelected: false });
      } catch (err) {
        res.send(err);
      }
    });
  }

  try {
    await Topics.deleteOne({ _id: id });
    res.json({ message: 'Successfully deleted' });
  } catch (err) {

  }
};

module.exports = {
  createTopic,
  getTopics,
  deleteTopic,
  updateTopic,
  updateTopicTitle,
};