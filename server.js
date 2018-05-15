const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db
var url = 'mongodb://shlee1353:shlee1353@ds127443.mlab.com:27443/mongodb-tutorial';

// Connect to MongoDB using a url
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 8080, () => {
    console.log('listening on 8080')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// Selects documents in a collection and returns a cursor to the selected documents.
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send({result: 'success'})
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').remove({name: req.body.name }, (err, result) => {
    if (err) return res.send(500, err)
    res.send({result: 'success'})
  })
})