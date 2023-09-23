const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    first: String,
    last: String,
    age: Number,
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'video',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets and sets the user's friends
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends ? this.friends.length : 0;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;