const transfer = require('./app/endpoints/transfer');

module.exports = (app) => {
    transfer(app);
}