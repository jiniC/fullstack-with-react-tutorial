import express from 'express'

const app = express()
const PORT = 3001


/* Route paths */

// match requests to root
app.get('/', (req, res) => {
  res.send('root')
})

// match requests to /about
app.get('/about', (req, res) => {
  res.send('about')
})

// match requests to /random.text
app.get('/random.text', (req, res) => {
  res.send('random.text')
})

// will match /acd and /abcd
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})

// will match /abcd, /abbcd, 'abbbcd, and so on
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})

// will match /abcd, /abxcd, /abRANDOMcd, /ab123cd, and so on
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})

// will match /abe, and /abcde
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})

// Based on regular expressions
// will match anything with an "a" in it
app.get(/a/, (req, res) => {
  res.send('/a/')
})

// will match butterfly and dragonfly
app.get(/.fly$/, (req, res) => {
  res.send('/.fly$/')
})


app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`)
})
