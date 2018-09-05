import express from 'express'
import mongodb from 'mongodb'
import assert from 'assert'

const router = express.Router()
const MongoClient = mongodb.MongoClient

const url = 'mongodb://shlee1353:shlee1353@ds127443.mlab.com:27443/mongodb-tutorial';
const dbName = 'mongodb-tutorial'

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  assert.equal(null, err)

  const db = client.db(dbName)
  const collection = db.collection('quotes')

  router.get('/', (req, res) => {
    collection.find({}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {quotes: result})
    })
  })

  router.post('/quotes', (req, res) => {
    collection.insertOne(req.body, (err, result) => {
      if (err) return console.log(err)
      res.redirect('/')
    })
  })

  router.put('/quotes', (req, res) => {
    collection
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
    collection.deleteOne({name: req.body.name }, (err, result) => {
      if (err) return res.send(500, err)
      res.send({result: 'success'})
    })
  })
})

export default router;