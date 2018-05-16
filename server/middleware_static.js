import express from 'express'

const app = express()
const PORT = 3001

// http://expressjs.com/ko/guide/using-middleware.html

app.use(express.static('public'))

// app.use('/static', express.static('public'))


// express.static 함수에 제공되는 경로는 node 프로세스가 실행되는 디렉토리에 대해 상대적입니다.
// Express 앱을 다른 디렉토리에서 실행하는 경우에는 다음과 같이 절대경로를 사용하는것이 더 안전합니다.

// absolute path
// app.use('/static', express.static(__dirname + '/public'))

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
