const express = require('express')
const db = require('../data/helpers/projectModel')
const router = express.Router()

// POST: creates a project
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description
    } = req.body
    if (!name || !description) {
      res.status(400).json({
        error: "Requirements not met!"
      })
    } else {
      const createProject = {
        ...req.body
      }
      const makeProject = await db.insert(createProject)
      res.status(201).json(makeProject)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Couldn't fulfill request"
    })
  }
})

// GET: gets all projects
router.get('/', async (req, res) => {
  try {
    const projects = await db.get()
    res.status(200).json(projects)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Couldn't fulfill request"
    })
  }
})

// GET: gets project by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const getProjects = await db.get(id)
    if (!getProjects) {
      res.status(400).json({
        error: `No projects found with id:${id}`
      })
    } else {
      res.status(200).json(getProjects)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Couldn't fulfill request"
    })
  }
})

// GET: actions for project by ID
router.get('/actions/:id', async (req, res) => {
  try {
    const id = req.params.id
    const getProjectActions = await db.getProjectActions(id)
    if (!getProjectActions.length) {
      res.status(400).json({
        error: "No actions for project"
      })
    } else {
      res.status(200).json(getProjectActions)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Couldn't fulfill request"
    })
  }
})

// PUT: updates project by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      description
    } = req.body
    const id = req.params.id
    if (name && description) {
      const makeProject = await db.update(id, {
        name,
        description
      })
      res.status(200).json(makeProject)
    } else {
      res.status(400).json({
        error: "Requirements not met "
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Couldn't fulfill request"
    })
  }
})

// DELETE: deletes a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteProject = await db.remove(id)
    if (deleteProject >= 1) {
      res.status(200).json({
        success: `removed ${deleteProject} entries`
      })
    } else {
      res.status(400).json({
        error: `removed ${deleteProject} entries`
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: "Couldn't fulfill request"
    })
  }
})

module.exports = router