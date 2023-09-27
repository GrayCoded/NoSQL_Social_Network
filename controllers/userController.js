const { User, Thought } = require('../models/index');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find();
            if (!users || users.length === 0) {
                return res.json([]);
            }

            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getSingleUser(req, res) {
        try {
            const userId = req.params.userId;
            const user = await User.findOne({ _id: userId }).select('-__v');

            if (!user) {
                return res.status(404).json({ error: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.status(201).json(dbUserData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateUser(req, res) {
        try {
            const userIdToUpdate = req.params.userId;
            const existingUser = await User.findById(userIdToUpdate);

            if (!existingUser) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            const updatedUser = await User.findByIdAndUpdate(
                userIdToUpdate,
                { $set: req.body },
                { runValidators: true, new: true }
            );

            res.json(updatedUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async deleteUser(req, res) {
        try {
            const userIdToDelete = req.params.userId;
            const user = await User.findOneAndRemove({ _id: userIdToDelete });

            if (!user) {
                return res.status(404).json({ error: 'No user found with this id!' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json({ message: 'User and associated thoughts successfully deleted!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            const newUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
                { new: true }
            );

            const newFriend = await User.findByIdAndUpdate(
                friendId,
                { $addToSet: { friends: userId } },
                { new: true }
            );

            if (!newUser || !newFriend) {
                return res.status(404).json({ message: 'No user or friend found with that ID :(' });
            }

            res.status(200).json({ message: 'Friend added!', user: newUser });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async removeFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            const newUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { runValidators: true, new: true }
            );

            const newFriend = await User.findByIdAndUpdate(
                friendId,
                { $pull: { friends: userId } },
                { new: true }
            );

            if (!newUser || !newFriend) {
                return res.status(404).json({ message: 'No user or friend found with that ID :(' });
            }

            res.status(200).json({ message: 'Friend removed!', user: newUser });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    ,
};
