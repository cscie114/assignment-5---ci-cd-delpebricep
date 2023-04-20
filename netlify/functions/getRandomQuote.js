const fetch = require('node-fetch');


const handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, world."
        })
    };
};

module.exports = { handler };
// https://api.quotable.io/quotes/random