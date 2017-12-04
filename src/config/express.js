import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import path from 'path'
import { log } from 'console'

import { main, api } from '../routes'

const { SERVER_PORT, SERVER_HOST, NODE_ENV } = process.env

const app = express()

// view engine setup (comment this follow, if you want API instead of MVC)
app
  .set('views', path.join(__dirname, '../views'))
  .set('view engine', 'hbs')

  .use(cookieParser()) // Parse Cookie (req.cookie)
  .use(express.static(path.join(__dirname, '../public')));

app
  .use(morgan('dev')) // :method :url :status :response-time ms - :res[content-length]
  .use(bodyParser.json()) // Parse application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parse application/x-www-form-urlencoded
  .use(cors()) // Enable Cross Origin Resource Sharing
  .use(helmet()) // Secure your app by setting various HTTP headers
  .use(passport.initialize()) // initialize passport middleware

app
  .disable('x-powered-by') // Disable 'X-Powered-By' header in response
  .disable('etag') // Remove No Cache Control

app
  .use('/', main) // Main routes
  // .use('/api/v1', api) // Api routes

app.listen(SERVER_PORT, SERVER_HOST, () => {
  if (NODE_ENV !== 'test')
    log('[Express] Api is running on port', SERVER_PORT)
})

export default app
