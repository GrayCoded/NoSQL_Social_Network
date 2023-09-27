const { Thought, Reaction } = require('../models/index');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            if (!thoughts || thoughts.length === 0) {
                return res.json([]);
            }

            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getSingleThought(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const thought = await Thought.findOne({ _id: thoughtId }).select('-__v');

            if (!thought) {
                return res.status(404).json({ error: 'No thought found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateThought(req, res) {
        try {
            const thoughtIdToUpdate = req.params.thoughtId;


            const existingThought = await Thought.findById(thoughtIdToUpdate);

            if (!existingThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }


            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtIdToUpdate,
                { $set: req.body },
                { new: true }
            );

            res.json(updatedThought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    },

    async deleteThought(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const reactionIdToDelete = req.params.reactionId;
            const thought = await Thought.findOne({ _id: thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            const reactionIndex = thought.reactions.findIndex(
                (reaction) => reaction._id.toString() === reactionIdToDelete
            );

            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'No reaction with this id!' });
            }

            thought.reactions.splice(reactionIndex, 1);

            const updatedThought = await thought.save();

            res.json(updatedThought);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async createReaction(req, res) {
        try {
            const dbReactionData = await Reaction.create(req.body);
            res.status(201).json(dbReactionData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async deleteReaction(req, res) {
        try {
            const reactionIdToDelete = req.params.reactionId;

            const dbReactionData = await Reaction.findOneAndDelete({ _id: reactionIdToDelete });

            if (!dbReactionData) {
                return res.status(404).json({ message: 'No reaction with this id!' });
            }

            res.json(dbReactionData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

};

