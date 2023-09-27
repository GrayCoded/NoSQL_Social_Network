const { default: mongoose } = require('mongoose');
const Thought = require('../models/Thought');
const User = require('../models/User');

async function seedDatabase() {
  try {

    await mongoose.connect('mongodb://127.0.0.1:27017/Social_NetworkDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    await User.deleteMany();
    await Thought.deleteMany();


    const user1 = await User.create({
      username: 'john mallen',
      email: 'mallen@gmail.com',
    });

    const user2 = await User.create({
      username: 'Mike johns',
      email: 'johnn@gmail.com'
    });

    const user3 = await User.create({
      username: 'Anne lynn',
      email: 'anne@gmail.com'
    });

    const user4 = await User.create({
      username: 'marsha prono',
      email: 'marsh@gmail.com'
    });

    const user5 = await User.create({
      username: 'jeff prono',
      email: 'prono@gmail.com'
    });

    const thought1 = await Thought.create({
      thoughtText: 'I wonder if wolves dream',
      username: user1.username,
    });

    const thought2 = await Thought.create({
      thoughtText: 'I wonder if bugs dream',
      username: user2.username,
    });

    const thought3 = await Thought.create({
      thoughtText: 'I wonder if wolves sleep',
      username: user3.username,
    });

    const thought4 = await Thought.create({
      thoughtText: 'I wonder if cats sleep',
      username: user4.username,
    });

    const thought5 = await Thought.create({
      thoughtText: 'I wonder if dogs dream',
      username: user5.username,
    });

    user1.thoughts.push(thought1._id);
    user2.thoughts.push(thought2._id);
    user3.thoughts.push(thought3._id);
    user4.thoughts.push(thought4._id);
    user5.thoughts.push(thought5._id);

    await Promise.all([user1.save(), user2.save(), user3.save(), user4.save(), user5.save()]);

    console.log('Database seeded successfully');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();