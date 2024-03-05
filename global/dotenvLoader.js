const dotenv = require('dotenv');

function loadEnvConfig() {
    dotenv.config({ path: "./../.env" });
}

module.exports = loadEnvConfig;