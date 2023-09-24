const dayjs = require('dayjs');
const { Schema, Types } = require('mongoose');


//Creating the Reaction SCHEMA

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        responseBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdOnDate) => dayjs(createdOnDate).format('YYYY-MM-DD')
        },
    },
    {
        toJSON: {
            virtual: true,
            getters: true,

        },
        id: false,
    }
);

//creating the Thought SCHEMA

const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
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

//Creating a vitual Property
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;