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
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
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
            const newUser = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friendId } },
                { runValidators: true, new: true }
            );

            const newFriend = UserUser.findByIdAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: userId } },
                { new: true }
            );


            if (!newUser || !newFriend) {
                return res
                    .status(404)
                    .json({ message: 'No user or friend found with that ID :(' })
            }

            res.status(200).json({ message: 'Friend added!', user: newUser });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const newUser = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: friendId } },
                { runValidators: true, new: true }
            );

            const newFriend = UserUser.findByIdAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: userId } },
                { new: true }
            );


            if (!newUser || !newFriend) {
                return res
                    .status(404)
                    .json({ message: 'No user or friend found with that ID :(' })
            }

            res.status(200).json({ message: 'Friend removed!', user: newUser });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
