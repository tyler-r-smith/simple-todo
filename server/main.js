import express from 'express'
import api from './api'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
console.log(process.envMONGODB)
mongoose.connect(process.env.MONGODB)

const app = express()
const port = 5001

api(app)

app.get('*', (req, res) => {
  return res.status(404).send({error: 'Resource Not Found: Invalid Path'})
})


app.listen(port, () => console.log(`The API server has started ${port}!`))