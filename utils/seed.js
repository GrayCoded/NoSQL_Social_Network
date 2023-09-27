const mongoose = require('mongoose');
const Thought = require('../models/Thought');
const User = require('../models/User');

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Social_NetworkDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database.');

    await User.deleteMany();
    await Thought.deleteMany();

    console.log('Cleared existing data.');

    const users = [
      {
        username: 'john mallen',
        email: 'mallen@gmail.com',
      },
      {
        username: 'Mike johns',
        email: 'johnn@gmail.com'
      },
      {
        username: 'Anne lynn',
        email: 'anne@gmail.com'
      },
      {
        username: 'marsha prono',
        email: 'marsh@gmail.com'
      },
      {
        username: 'jeff prono',
        email: 'prono@gmail.com'
      },
    ];

    const thoughts = [
      {
        "thoughtText": "I like Marshmallows"
      },
      {
        "thoughtText": "I like chocolate"
      },
      {
        "thoughtText": "I like birds"
      },
      {
        "thoughtText": "I like Logs"
      },
      {
        "thoughtText": "I like cats"
      },
      {
        "thoughtText": "I like Sleds"
      },
      {
        "thoughtText": "I like waterballonss"
      },
      {
        "thoughtText": "I like logs"
      },
      {
        "thoughtText": "I like dogs"
      },
      {
        "thoughtText": "I like eatting"
      },
    ];



    const createdUsers = await User.create(users);
    const createdThoughts = await Thought.create(thoughts);

    console.log('Created users and thoughts.');

    for (const thought of createdThoughts) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      randomUser.thoughts.push(thought._id);
      await randomUser.save();
    }

    console.log('Assigned thoughts to users.');

    console.log('Database seeded successfully.');

    await mongoose.disconnect();
    console.log('Disconnected from the database.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}


seedDatabase();