import { User } from '../models'
import userData from './users'
import dotenv from 'dotenv'
import chalk from 'chalk'
import mongoose from 'mongoose';
dotenv.config()
mongoose.connect(process.env.MONGODB)

const user = new User(userData)
user.save()
.then(result => {
  console.log(chalk`{green A new user was created with username ${user.userName}}`)
  mongoose.connection.close()
})
.catch(err => {
  console.log(chalk`{red There was an error with the migration} ${err}`)
})