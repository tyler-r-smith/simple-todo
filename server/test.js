import mongoose from 'mongoose'
import { User, Task } from './data/models'

mongoose.connect('mongodb://localhost/test')

// const Tyler = new User({
//   name: 'Tyler',
//   userName: 'Tyler8',
//   password: 'This is not a password',
//   about: 'This is the first entry'
// })

// console.log(Tyler.save().then(b => {

// }))

const U = User.where({userName: 'Tyler5'})
U.findOne( (err, user) => {
  console.log(err, user)
})

Task.find().then(console.log)

// U.then(a => {
//   console.log({a})
//   a[0].authenticate('This is not a password')
//   .then(console.log)
//   .catch(console.warn)
// })

/*
  Creating a task and adding it to a given user
*/

// const TylerTask = new Task({
//   title: 'This is the 12th task',
//   dueDate: new Date()
// })

// TylerTask.save()
// console.log(TylerTask)

// const Users = User.find()
// Users.then( allUsers => {
//   const tasks = allUsers[0].tasks  ? [TylerTask._id, ...allUsers[0].tasks] : [TylerTask._id]
//   const update = User.update({_id: allUsers[0]._id}, {
//     tasks
//   })
//   update.then(console.log)
//   const U = User.find().populate('tasks')
//   U.then(console.log)
  
// })

// const U = User.find({userName: 'Tyler4'})
// U.then(a => {
//   console.log({a})
//   a[0].authenticate('test')
//   .then(console.log)
//   .catch(console.warn)
// })
