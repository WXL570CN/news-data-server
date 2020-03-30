const request = require('superagent')
const cheerio = require('cheerio')

module.exports = async url => {
  try {
    const res = await request.get(url).set('Content-Type', 'application/json')
    return cheerio.load(res.text, {decodeEntities: false})
  } catch (error) {
    console.error(error)
  }
}
