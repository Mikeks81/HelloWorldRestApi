const configs = {
  staging: {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging'
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production'
  }
}

const environementToExport = configs[process.env.NODE_ENV] || configs.staging

module.exports = environementToExport
