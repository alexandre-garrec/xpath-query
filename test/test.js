import XpathUtils from '../src/index'
import { expect } from 'chai'

describe('simple request', function () {
  
  it('should select input', function () {
    const Xpath = new XpathUtils()
    const request = Xpath.request().tag('input').done()
    expect(request).to.eql('//input')
  })

  it('should select span in input', function () {
    const Xpath = new XpathUtils()
    const request = Xpath.request().tag('input').tag('span').done()
    expect(request).to.eql('//input/span')
  })

  it('should select array of tags', function () {
    const Xpath = new XpathUtils()
    const request = Xpath.request().tag(['input', 'span']).done()
    expect(request).to.eql('//input | //span')
  })

  it('should select array of tags in array of tags', function () {
    const Xpath = new XpathUtils()
    const request = Xpath.request().tag(['input', 'span']).tag(['h1', 'h2', 'h3']).done()
    expect(request).to.eql('//input/h1 | //input/h2 | //input/h3 | //span/h1 | //span/h2 | //span/h3')
  })

})
