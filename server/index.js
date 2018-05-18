import express from 'express'
import bodyParser from 'body-parser'
import router from './router'

const app = express()
const PORT = 8080

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/', router)

app.listen(PORT, () => {
  console.log('web server started')
});