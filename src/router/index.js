const Router = require('@koa/router')
const router = new Router()
const handlers = require('./handlers')

module.exports = (db) => {
  router
    .get('/', (ctx) => handlers.default.main(ctx))
    .post('/donate', (ctx) => handlers.donate.addDonate(ctx, db))
  return router
}
