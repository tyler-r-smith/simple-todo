import passport from 'passport'
import { User } from '../data/models'
const LocalStrategy = require('passport-local').Strategy

export default (app) => {
  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      User.where({userName: username}).populate({path: 'tasks', options: {sort: {dueDate: 1}}})
      .findOne()
        .then((singleUser) => {
          if (!singleUser) {
            return done({message: 'Invalid Username'})
          }
          singleUser.authenticate(password)
            .then(isMatch => {
              singleUser.password = false
              return isMatch ? done(null, singleUser) : done({message: 'Invalid Password'})
            })
            .catch(err => {
              return done(err)
            })
        })
        .catch(err => {
          return done(err)
        })
    }
  ))
  passport.serializeUser(function(user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id).populate({path: 'tasks', options: {sort: {dueDate: 1}}}).sort('dueDate').select('-password')
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
  })


  passport.ensureAuthenticated = (req, res, next) => {
    if (req.user)
      return next() 
    else res.sendStatus(401)
  }

  app.use(require('cookie-parser')())
  app.use(require('express-session')({ secret: 'adfasdfseeawef keyboard cat', resave: false, saveUninitialized: false }))
  app.use(passport.initialize())
  app.use(passport.session())
  return passport
}