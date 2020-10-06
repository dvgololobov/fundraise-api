module.exports = (db) => {
  const Router = require('@koa/router')
  const router = new Router()
  const handlers = require('./handlers')

  router
    .get('/', (ctx) => handlers.default.main(ctx))
    .post('/donate', async (ctx) => handlers.donate.addDonate(ctx, db))
  return router
}
