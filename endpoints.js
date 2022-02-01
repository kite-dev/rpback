const transfer = require('./app/endpoints/transfer');
const user = require('./app/endpoints/user');

module.exports = (app) => {
    transfer(app);
    user(app);
}