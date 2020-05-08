const express = require('express')
const projectsRoute = require('./routers/projects')
const actionsRoute = require('./routers/actions')

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ YEP: 'working!' })
})

server.use('/api/projects', projectsRoute)
server.use('/api/actions', actionsRoute)

server.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`)
})