function promisify(original, self = null) {
  if (typeof original !== 'function') {
    throw new TypeError('original must be a function')
  }

  function wrapper(...args) {
    if (this !== global) {
      // called with bound self
      self = this
    }

    if (typeof args[args.length - 1] === 'function') {
      // called with callback
      return original.call(self, ...args)
    }

    // promisified
    return new Promise((resolve, reject) => {
      function cb(error, result) {
        if (error) {
          return reject(error)
        }
        resolve(result)
      }

      args.push(cb)

      original.call(self, ...args)
    })
  }

  return wrapper
}

module.exports = promisify
