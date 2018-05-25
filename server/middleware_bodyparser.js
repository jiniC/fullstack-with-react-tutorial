import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3001

app.use(express.static('public'))

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  console.log('/login 호출함')

  const paramId = req.body.id
  const paramPassword = req.body.password

  res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
  res.end(`입력한 id는 ${paramId}, password는 ${paramPassword} 입니다.`)
})

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
