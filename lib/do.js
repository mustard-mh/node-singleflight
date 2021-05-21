const event = require('events')

let bus = new event.EventEmitter()

let doing = {}

// Do executes and returns the results of the given function, making
// sure that only one execution is in-flight for a given key at a
// time. If a duplicate comes in, the duplicate caller waits for the
// original to complete and receives the same results.
// The return value shared indicates whether v was given to multiple callers.
//
// Copy from golang pkg sync/singleflight
//
async function Do (key, func) {
  if (doing[key] === true) {
    return new Promise(function (resolve, reject) {
      bus.once('sf_' + key, (err, data) => {
        if (err != null) {
          reject(err)
          return
        }
        resolve(data)
      })
    })
  }
  doing[key] = true
  let data = null
  try {
    data = await func()
  } catch (e) {
    bus.emit('sf_' + key, e, data)
    throw e
  }
  bus.emit('sf_' + key, null, data)
  doing[key] = false
  return data
}

module.exports = Do
