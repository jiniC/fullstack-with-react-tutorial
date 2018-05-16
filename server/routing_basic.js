import express from 'express'

const app = express()
const PORT = 3001


/* Route methods */

// GET method
app.get('/', (req, res) => {
  res.send('GET request')
})

// POST method
app.post('/', (req, res) => {
  res.send('POST request')
})

// PUT method
app.put('/user', (req, res) => {
  res.send('PUT request at /user')
})

// DELETE method
app.delete('/user', (req, res) => {
  res.send('DELETE request at /user')
})


app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
