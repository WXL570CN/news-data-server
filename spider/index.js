const hotNews = require('./hotNews')
const hotSearchEvent = require('./hotSearchEvent')
const todayInHistory = require('./todayInHistory')
const hotGame = require('./hotGame')

module.exports = () => {
  hotNews(),
  hotSearchEvent(),
  todayInHistory(),
  hotGame()
}