module.exports = {
  addDonate: async (ctx, db) => {
    const donateRequest = ctx.request.body
    if (!donateRequest.amount || !donateRequest.currency) {
      ctx.throw(400, '"amount" and "currency" parameters are required')
    }
    if (donateRequest.amount > 0) {
      const currency = await db.models.Currency.findOne({ code: donateRequest.currency })
      try {
        if (currency !== null) {
          const donate = new db.models.Donate({ amount: +donateRequest.amount, currency: donateRequest.currency, date: new Date() })
          await donate.save()
          ctx.body = { ok: true }
        } else {
          ctx.throw(400, 'Please use approved currency')
        }
      } catch (e) {
        console.log('POST /donate error', e)
        ctx.throw(500, 'POST /donate server error')
      }
    } else {
      ctx.throw(400, '"amount" must be positive')
    }
  }
}
