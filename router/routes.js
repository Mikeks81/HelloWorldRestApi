const Controllers = require('../Controllers')
// Define routes and their conrollers
const routes = {
  helloworld: Controllers.HelloWorldController.helloWorld
}

module.exports = routes