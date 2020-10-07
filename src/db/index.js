const mongoose = require('mongoose')

module.exports = (host, port, db) => {
  mongoose.connect(`mongodb://${host}:${port}/${db}`, { useNewUrlParser: true, useUnifiedTopology: true })

  const Currency = mongoose.model('Currency', require('./models/Currency'))
  const Donate = mongoose.model('Donate', require('./models/Donate'))

  // Default currencies
  const currencies = [
    { name: 'US Dollar', code: 'USD', symbol: '$', rate: 1 },
    { name: 'Euro', code: 'EUR', symbol: '€', rate: 0.897597 },
    { name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.81755 },
    { name: 'Russian Ruble', code: 'RUB', symbol: '₽', rate: 63.461993 }
  ]

  // Create currencies if not exist
  for (const currency of currencies) {
    Currency.findOne({ name: currency.name })
      .then(currentCurrency => {
        console.log('currency', currentCurrency)
        if (currentCurrency === null) {
          const setCurrency = new Currency(currency)
          setCurrency.save()
        }
      })
      .catch(e => console.log('findCurrency err', e))
  }

  return {
    mongoose,
    models: {
      Donate,
      Currency
    }
  }
}
