import express from 'express'

const router = express.Router();
const MongoClient = require('mongodb').MongoClient

let db
let url = 'mongodb://shlee1353:shlee1353@ds127443.mlab.com:27443/mongodb-tutorial';

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
})

router.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

router.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

router.put('/quotes', (req, res) => {
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

router.delete('/quotes', (req, res) => {
  db.collection('quotes').remove({name: req.body.name }, (err, result) => {
    if (err) return res.send(500, err)
    res.send({result: 'success'})
  })
})

export default router;