// node-singleflight
// provides a duplicate function call suppression
//
// argument `func` may need to set up `timeout` in some ways
// otherwise may create too many listeners and cause memory leak

const Do = require('./lib/do')

module.exports = {
  Do: Do,
}
