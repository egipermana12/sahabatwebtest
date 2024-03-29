const dotenv = require('dotenv');

function loadEnvConfig() {
    dotenv.config({ path: "./../../.env" });
}

function urlStep2()
{
    loadEnvConfig();
    const url = `${process.env.BASE_URL}pendaftaran/step-2`;
    return url;
}

module.exports = urlStep2;