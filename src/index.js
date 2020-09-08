const { config } = require('dotenv')
config()

const Bot = require('./bot')
const Web = require('./web')

new Bot()
new Web(process.env.PORT || 3333)