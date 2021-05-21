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
