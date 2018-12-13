// import all dependencies
const http = require('http')
const https = require('https')
const fs = require('fs')
const config = require('./configs')
const router = require('./router')

// Instantiating the HTTP server
const httpServer = http.createServer((req, res) => {
  router(req, res)
})
// start the server on the port determined by the environement.
httpServer.listen(config.httpPort, () => {
  console.log(`HTTP server running on port ${config.httpPort}`)
})

const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
}
// Instantiating the HTTPS server
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  router(req, res)
})
// start the server on the port determined by the environement.
httpsServer.listen(config.httpsPort, () => {
  console.log(`HTTPS server running on port ${config.httpsPort}`)
})