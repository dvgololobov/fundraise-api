const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const cors = require('@koa/cors')

const app = new Koa()

const db = require('./db')(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME)
const router = require('./router')(db)

app
  .use(helmet())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
