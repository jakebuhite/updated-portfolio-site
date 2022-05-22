const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send('Welcome to Jakes Portfolio!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})