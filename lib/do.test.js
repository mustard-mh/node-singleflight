const Do = require('./do')

function get (num, errFrom = null, after = 200) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (errFrom != null) {
        reject(new Error('get error from ' + errFrom))
      } else {
        resolve(num)
      }
    }, after)
  })
}

test('Do 10000 times = call once', async () => {
  let callGet = 0
  let times = 10000
  let num = 1

  let tasks = []
  for (let i = 0; i < times; i++) {
    tasks.push(Do('get_' + num, async () => {
      callGet++
      return get(num)
    }))
  }
  let results = await Promise.all(tasks)
  expect(callGet).toBe(1)
  expect(results.length).toBe(times)
  for (let r of results) {
    expect(r).toBe(num)
  }
})

test('Do catch error', async () => {
  let callGet = 0
  let times = 10000
  let num = 2

  let tasks = []
  for (let i = 0; i < times; i++) {
    tasks.push((async () => {
      try {
        return await Do('get_err', async () => {
          callGet++
          return get(num, i)
        })
      } catch (e) {
        return e.message
      }
    })())
  }
  let results = await Promise.all(tasks)
  expect(callGet).toBe(1)
  expect(results.length).toBe(times)
  for (let r of results) {
    expect(r).toBe('get error from 0')
  }
})
