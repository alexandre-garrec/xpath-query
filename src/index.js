import { mapObject } from './utils'
import query from './query'

class XpathUtils {

  concat (array) {
    return array.join(' | ')
  }

  extractTag (tags = '*') {
    return Array.isArray(tags) 
    ? `{{${tags.join(',')}}}`
    : tags
  }
    
  getRequest(memo = '') {
    return mapObject(query, (_, key) => (...props) => 
      this.beforeRequest(key, memo, ...props))
  }

  beforeRequest (key, memo, ...params) {
    params = params.map(param => this.extractTag(param))
    return this.request(query[key](...params), memo)
  }

  done (request) {
    const regex = /{{(.+?)}}/
    const findArray = request.match(/{{(.+?)}}/g) || []

    if (findArray.length) {
      return this.concat(findArray.reduce((memo, array) => {
        const [, table] = regex.exec(array)
        return memo.reduce((m, req) => 
          m.concat(table.split(',').map((tag) => req.replace(regex, tag)))
        , [])
      }, [request]))
    }

    return request
  }

  request (request = '/', memo = '') {
    memo += request
    return {
      ...this.getRequest(memo),
      done: () => this.done(memo)
    }
  }
}

export default XpathUtils
