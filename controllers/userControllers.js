const { User, Thought } = require('../models/index');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            await Thought.deleteMany({ _id: { $in: user.thoutghts } });
            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
                { new: true }
            )
        }
    },

    async updateFriend(req, res) {
        const updateFriend = await User.findIdAndUpDate(
            friendId,
            { $addToSet: { friends: friendId } },
            { new: true }
        );

        if (!updateFriend) {
            return res.status(404).json({ message: 'No user or friend found with this id!' });
        }  
    },

    async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
            { runValidators: true, new: true }
          );
    
          if (!student) {
            return res
              .status(404)
              .json({ message: 'No student found with that ID :(' });
          }
    
          res.json(student);
        } catch (err) {
          res.status(500).json(err);
        }
      },
};
