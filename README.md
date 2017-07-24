# smart-promisify
A smart implementation of promisify using native promises

## Install

```bash
npm i smart-promisify
```

## Example - Promisify fs.mkdir

[![Build Status](https://travis-ci.org/robojones/smart-promisify.svg?branch=master)](https://travis-ci.org/robojones/smart-promisify)

```javascript
const fs = require('fs')
const promisify = require('smart-promisify')

// create an async function so we can await stuff
async function example () {

  // wrap the fs.mkdir method
  let mkdir = promisify(fs.mkdir)

  // await the promise returned by the wrapper
  await mkdir('folder1')

  // you can still provide a callback.
  // the wrapper will return the return value of the fs.mkdir instead of a promise
  mkdir('folder2', console.log)

  // changing the this of the promisified function
  mkdir.call(fs, 'folder3')
  // fs.mkdir will now have fs as its this object

  // alternatively you can call the promisify function with a second argument.
  mkdir = promisify(fs.mkdir, fs)
  // the second argument will be used as this object for the wrapped function, if it isn't changed afterwards by with call, bind or apply
}

example().catch(console.error)
```