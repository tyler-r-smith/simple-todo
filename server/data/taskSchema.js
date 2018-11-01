import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})