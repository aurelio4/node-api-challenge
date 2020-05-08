const express = require('express')
const db = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ projects: "works" })
})

module.exports = router