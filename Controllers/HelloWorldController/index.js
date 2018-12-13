class HelloWorldController {
  static helloWorld (data, cb) {
    cb(200, {hello: 'world'})
  }
}

module.exports = HelloWorldController