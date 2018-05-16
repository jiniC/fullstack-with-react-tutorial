import express from 'express'

const app = express()
const PORT = 3001


/* Route parameters */

//http://localhost:3000/users/34/books/8989
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

// http://localhost:3000/flights/LAX-SFO
app.get('/flights/:from-:to', (req, res) => {
  res.send(req.params)
})

// http://localhost:3000/plantae/Prunus.persica
app.get('/plantae/:qenus.:species', (req, res) => {
  res.send(req.params)
})

// http://localhost:3000/user/42
app.get('/user/:userId(\\d+)', (req, res) => {
  res.send(req.params)
})


app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
