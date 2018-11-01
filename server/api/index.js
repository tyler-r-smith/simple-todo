import userApi from './user.js'
import taskApi from './task'
import bodyParser from 'body-parser'
import passportInit from './passport'

export default (app) => {
  app.use(bodyParser.json())
  const passport = passportInit(app)
  userApi(app, passport)
  taskApi(app, passport)
}