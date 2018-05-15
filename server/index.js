import express from 'express'

const app = express()
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
