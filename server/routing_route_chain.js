import express from 'express'

const app = express()
const PORT = 3001

app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
