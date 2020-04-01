'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://47.112.144.243:8085/"'
  // BASE_URL: '"http://192.168.1.108:8085/"'
})
