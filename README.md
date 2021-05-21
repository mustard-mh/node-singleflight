# node-singleflight
provides a duplicate function call suppression

## Notice

argument `func` may need to set up `timeout` in some ways, otherwise it may create too many listeners and cause memory leak

## Install

Yarn
```
yarn add node-singleflight
```

NPM
```
npm install node-singleflight --save
```

## Usage

 + See [do.test.js](./lib/do.test.js) File

```js
const singleflight = require('node-singleflight')

async function example() {
    let data = singleflight.Do('SomeKey', async () => {
        let data = await doSomething()
        let processed = processData(data)
        return processed
    })
    return data
}

```
