/**
 * This is necessary to get jest working. Got the following error on line importing axios
 * Errors: SyntaxError: Cannot use import statement outside a module
*/
//import mockAxios from 'jest-mock-axios';
//export default mockAxios;

//Code from https://github.com/vspedr/movile-messaging/pull/8/files#diff-4018200b706ff39bb5cecf34c05f57af9768ff6a2af11abe2620f7ca6dbde419

const fs = require('fs')

const mock = jest.fn((url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./__mockData__${url}.json`, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data));
    })
  })
})

module.exports = {
  get: mock,
  post: mock,
  create: jest.fn(function() {
    return this;
  })
};