import express from 'express'

const app = express()
const PORT = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
