const {poll} = require('pg');
require('dotenv').config();

const poll = new Poll({
    user:'process.env.DB_USER',
    host:'process.env.DB_HOST',
    dataBase:'process.env.DB_NAME',
    password:'process.env.DB_NAME',
    port:'process.env.DB_PORT',
})

module.export(poll);