import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 3001

app.use(cookieParser())

app.get('/', (req, res) => {
  res.cookie('myCookie', 'good')
  res.end('Set cookie')
})

app.get('/removeCookie', (req, res) => {
  res.clearCookie('myCookie')
  res.end('Remove cookie')
})

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
