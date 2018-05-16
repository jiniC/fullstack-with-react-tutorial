import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 3001
const router = express.Router()

app.use(cookieParser())

router.get('process/showCookie', (req, res) => {
  console.log('/process/showCookie 호출함')

  // res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
  res.send(req.cookies.user)
})

router.get('/process/setUserCookie', (req, res) => {
  console.log('/process/setUserCookie 호출함')

  // 쿠키 설정
  res.cookie('user', {
    id: 'eedaihee',
    name: '이대희',
    authorized: true
  })

  // res.send(req.cookies)

  res.redirect('/process/showCookie')
})

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
