const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the category'],
    unique: true,
    trim: true,
    maxlength: [
      40,
      'A category name must have less or equal than 40 characters',
    ],
    minlength: [3, 'A category name must have more or equal than 3 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let Category;
try {
  Category = mongoose.model('Category');
} catch (err) {
  Category = mongoose.model('Category', categorySchema);
}
// const User = mongoose.model('User') || mongoose.model('User', userSchema);
module.exports = Category;
