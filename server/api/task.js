import { Task, User } from '../data/models'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/test')

export default (app, passport) => {
  app.get('/api/task/:taskId', passport.ensureAuthenticated, (req, res) => {
    Task.where({_id: req.params.taskId}).populate('tasks').findOne( (err, singleTask) => {
      return err ? res.send(err) :  
      res.send(singleTask)
    })
  })
  app.get('/api/task/:taskId/users', passport.ensureAuthenticated, (req, res) => {
    User.find({tasks: req.params.taskId}).populate('tasks').then((err, Users) => {
      return err ? res.send(err) :  
      res.send(Users)
    })
  })
  app.post('/api/task/', passport.ensureAuthenticated, (req, res) => {
    Task.create(req.body.task)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
  })
  app.put('/api/task/:taskId', passport.ensureAuthenticated, (req, res) => {
    Task.updateOne({_id: req.params.taskId}, req.body.task)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
  })
}