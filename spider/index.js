const hotNews = require('./hotNews')
const todayInHistory = require('./todayInHistory')
const hotSearchEvent = require('./hotSearchEvent')
const hotGame = require('./hotGame')

module.exports = () => {
  // hotSearchEvent(),
  // hotGame(),
  hotNews(),
  todayInHistory()
}