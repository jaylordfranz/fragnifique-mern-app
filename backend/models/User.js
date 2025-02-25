const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },  // Make password optional
  // Other fields as needed...
});

module.exports = mongoose.model('User', userSchema);