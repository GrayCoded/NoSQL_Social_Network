const { Schema, Types } = require('mongoose');

//creating the thought SCHEMA

const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdOnDate) => dayjs(createdOnDate).format('YYYY-MM-DD')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

module.exports = thoughtSchema;
