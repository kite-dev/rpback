const transfer = require('./app/endpoints/transfer');
const user = require('./app/endpoints/user');
const associate = require('./app/endpoints/associate');
module.exports = (app) => {
    transfer(app);
    user(app);
    associate(app);
}