import { User } from '../data/models'
import mongoose from 'mongoose'

export default (app, passport) => {
  app.post('/api/authenticate', (req, res, next) => {passport.authenticate('local', {failureFlash: 'Invalid username or password.' },
    function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send(info); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user);
      })
    })(req, res, next)
  })
  app.get('/api/current-user',  passport.ensureAuthenticated, (req, res) => {
     res.send(req.user)
  })
  app.get('/api/user/:userId', passport.ensureAuthenticated, (req, res) => {
    User.where({_id: req.params.userId}).populate('tasks').findOne().select('-password')
      .then(singleUser => !singleUser ? res.sendStatus(404) : res.send(singleUser))
      .catch(err => res.sendStatus(500)) 
  })
  app.put('/api/user/:userId', passport.ensureAuthenticated, (req, res) => {
    User.updateOne({_id: req.params.userId}, req.body.user)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
  })
  app.post('/api/user/logout', passport.ensureAuthenticated, (req, res) => {
    res.send(req.logout())
  })
}