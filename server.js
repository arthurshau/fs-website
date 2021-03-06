const path = require('path')
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const api = require('./server-api')

const PORT = process.argv[2] || process.env.FS_PORT || 80
const INDEX_PATH = path.resolve(__dirname, './dist/index.html')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(compression({ level: 9 }))
}

app.set('json spaces', 2)

app.use(favicon(path.resolve(__dirname, './src/favicon.ico')))
app.use(express.static(path.resolve(__dirname, './dist')))

app.use('/api', api)

app.get('*', (_, response) => {
  response.sendFile(INDEX_PATH)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
