const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    tokens: { type: Number, default: 0 },
    agreed: { type: Boolean, default: false }
});

mongoose.model('users', userSchema);
