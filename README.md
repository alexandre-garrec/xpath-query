# xpath-request 

Create Xpath request in javascript

[![travis](https://travis-ci.org/alexandre-garrec/xpath-request.svg)](https://travis-ci.org/alexandre-garrec/xpath-request) [![npm](https://img.shields.io/npm/v/xpath-request-js.svg?style=flat-square)](https://www.npmjs.com/package/xpath-request-js)  [![david-dm](https://david-dm.org/alexandre-garrec/xpath-request.svg)](https://david-dm.org/alexandre-garrec/xpath-request)
## Install

## Run
```console
$ npm test
$ npm run build
$ npm run lint
```


## API

 * tag 
 * findByText 
 * findByTextContent 
 * following 
 * select 
 * first 
 * last 
 * all 
 * attribute 
 * custom 

## Demo


```javascript
  const request = Xpath.request()
		.tag(['input', 'span'])
		.tag(['h1', 'h2', 'h3'])
		.done()

  // result '//input/h1 | //input/h2 | //input/h3 | //span/h1 | //span/h2 | //span/h3'
```