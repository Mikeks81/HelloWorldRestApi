// declare all dependencies
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const {ApplicationController} = require('../Controllers')
const routes = require('./routes')

const router = (req, res) => {
  // get the url from the request parse will give us an object
  // of the good stuff, the true argument tells it to parse
  // the query string
  const parsedUrl = url.parse(req.url, true)

  // get the path from parsedUrl object
  const path = parsedUrl.pathname

  // regex times start/ending slash and end spaces
  const trimmedPath = path.replace(/^\/+|\/+s/g, '')

  // get the query string object
  const queryStringObject = parsedUrl.query

  // get the HTTP method
  const method = req.method.toLowerCase()

  // get the req headers as an object
  const {headers} = req

  // Get the payload if ther is any
  const decoder = new StringDecoder('utf-8')
  let buffer = ''
  // payload/data comes in as a stream and we're listening for it
  // take every small chunks of that stream decode into utf-8 and add and store
  // in the buffer variable
  req.on('data', (data) => {
    buffer += decoder.write(data)
  })

  // end event gets call with OR without data/payload
  req.on('end', () => {
    buffer += decoder.end()

    // Chose the controller that this request should go to
    // if one is not found use the notFound(404) handler
    const chosenController = routes[trimmedPath] || ApplicationController.notFound

    // Construct the data object 
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    }

    // Route the request to the handler specified in the routes
    chosenController(data, (statusCode, payload) => {
      // Use the status code called back by the handler or default to 200
      statusCode = typeof statusCode === 'number' ? statusCode : 200
      // Use the paylaod called back by the handler or default to an empty object
      payload = typeof payload === 'object' ? payload : {}

      // Convert payload object to a string
      const payloadString = JSON.stringify(payload)

      // Return the response
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)

      // Log the path thet was requested
      console.log(`Returning this response: `, statusCode, payloadString)
    })
  })
}

module.exports = router