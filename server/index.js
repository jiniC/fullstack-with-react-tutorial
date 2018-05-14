import http from 'http'

const server = http.createServer()
const PORT = 3000

server.on('request', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write('Hello World')
  res.end()
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
