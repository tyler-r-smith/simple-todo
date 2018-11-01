import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;
const SALT_WORK_FACTOR = 10;

const User = new Schema({
  userName: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: Array
  },
  tasks: [{
    type: ObjectId,
    ref: 'Task'
  }],
})

/* Authenticate function */
User.methods.authenticate = function (password) {
  return  new Promise( (resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) reject(err)
      else resolve(isMatch)
    })
  })
}

/* Hash the password */
User.pre('save', function(next) { var user = this;
  if (!user.isModified('password')) return next();
  
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  })
})

export default User