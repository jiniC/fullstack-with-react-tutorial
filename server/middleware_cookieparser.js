import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 3001

app.use(cookieParser())

app.get('/', (req, res) => {
  res.cookie('myCookie', 'good')
  res.end('Set cookie')
})

app.get('/readcookie', (req, res) => {
  const cookie = req.cookies.myCookie
  res.send(`cookie: ${cookie}`)
})

app.get('/updatecookie', (req, res) => {
  const new_value = 'very good'
  res.cookie('myCookie', new_value)
  res.send('myCookie is updated.')
})

app.get('/deletecookie', (req, res) => {
  res.clearCookie('myCookie')
  res.end('myCookie is deleted.')
})

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
