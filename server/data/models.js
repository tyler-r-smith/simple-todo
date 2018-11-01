import taskSchema from './taskSchema'
import userSchema from './userSchema'
import mongoose from 'mongoose'


export const User = mongoose.model('User', userSchema)
export const Task = mongoose.model('Task', taskSchema)