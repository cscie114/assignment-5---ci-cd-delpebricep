const fetch = require('node-fetch');


const handler = async function () {
    try {
        const response = await fetch("https://api.quotable.io/quotes/random", {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: response.statusText
            }
        }
        
        const data = await response.json();
        const quote = data[0];

        return {
            statusCode: 200,
            body: JSON.stringify({ ...quote })
        };
    } catch (error) {
        console.error("ERROR: Could not fetch random quote from Quotable.");
        console.log(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        }
    }
};

module.exports = { handler };
