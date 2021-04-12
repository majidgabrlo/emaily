const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  email: String,
  name: String,
  credit: { type: Number, default: 2 },
});

mongoose.model('users', userSchema);
