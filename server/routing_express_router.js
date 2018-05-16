import express from 'express'

const app = express()
const PORT = 3001
const router = express.Router()

const timeLog = (req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next()
}

// middleware that is specific to this router
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})

// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

// use birds router
app.use('/birds', router)

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
