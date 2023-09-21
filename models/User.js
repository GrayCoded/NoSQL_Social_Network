const mongoose = require('mongoose');
const User = model('user', userSchema);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trimmed: true },
    email: {
        type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address.',],
    },
    thoughts: { type: Schema.Types.ObjectId, ref: 'thought', },
    friends: { type: Schema.Types.ObjectId, ref: 'user', },
},
    {
        toJson: { virtuals: true, },
        id: false,
    });

userSchema.virtual('friendCount').get(function () {
    return this.friends ? this.friends.length : 0;
});

module.export = User;