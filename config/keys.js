// ('mongodb+srv://emaily-prod:fuchs333@emaily-prod.klld4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
