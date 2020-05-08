const express = require('express')
const db = require('../data/helpers/actionModel')
const router = express.Router()

// GET: gets all actions
router.get('/', async (req, res) => {
  try {
    const data = await db.get()
    res.status(200).json(data)
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: "Couldn't fulfill request" })
  }
})

// GET: gets action by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await db.get(id)
    res.status(200).json(data)
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: "Couldn't fulfill request" })
  }
})

// POST: adds an action
router.post('/', async (req, res) => {
  try {
    const { project_id, description, notes } = req.body
    const getProjectById = await db.get(project_id)
    if(!getProjectById) {
      res.status(400).json({ error: `Project by id:${project_id} does not exist` })
      return
    }

    if(!project_id || !description || !notes) {
      res.status(400).json({ error: "requirements not met" })
    } else {
      const postToCreate = { ...req.body }
      const createPost = await db.insert(postToCreate)
      res.status(201).json(createPost)
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: "Couldn't fulfill request" })
  }
})

// PUT: updates an action by ID
router.put('/:id', async (req, res) => {
  try {
    const { project_id, description, notes } = req.body
    const postToUpdate = await db.get(req.params.id)
    const updatedPost = { ...postToUpdate, project_id, description, notes }
    const update = await db.update(req.params.id, updatedPost)
    res.status(200).json(update)
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: "Couldn't fulfill request" })
  }
})

// DELETE: deletes an action by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletePost = await db.remove(id)
    if(deletePost >= 1) {
      res.status(200).json({ success: `removed ${deletePost} entries` })
    } else {
      res.status(400).json({ error: `removed ${deletePost} entries` })
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: "Couldn't fulfill request" })
  }
})

module.exports = router