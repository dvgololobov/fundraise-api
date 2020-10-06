require('dotenv').config()
const port = process.env.PORT || 8000
const app = require('./app')

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
