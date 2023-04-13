require("dotenv").config();

const EleventyFetch = require("@11ty/eleventy-fetch");

const baseUrl = "https://api.igdb.com/v4";
const clientId = process.env.IGDB_CLIENT_ID;
const accessToken = process.env.IGDB_ACCESS_TOKEN;
const cacheDuration = "1d";

const requestHeaders = {
    "Client-ID": clientId,
    "Authorization": `Bearer ${accessToken}`,
    "Accept": "application/json",
    "Content-Type": "text/plain",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
};


const RECORD_LIMIT_GAME = 500;
const RECORD_LIMIT_PLATFORM = 200;
const MIN_GAME_RATING = 75;


// This generic function calls the IGDB API.
// It targets a given endpoint with a string that serves as the request's body.
// It uses the same cache and headers so we do not have to repeat ourselves.
async function igdbFetch(endpoint, body) {

    /* 
        I am employing a hack here.
        The IDGB API only accepts POST requests.
        If I make a POST request with 11ty-fetch,
        it will always cache and return the same request- even if the request body was different.
        To get around this, I appended the request body string to the request URL.

        Source: https://github.com/11ty/eleventy-fetch/issues/20#issuecomment-1488804134
    */
    const hash = body.trim();
    const requestUrl = `${baseUrl}/${endpoint}#${hash}`;
    
    // Call 11ty-fetch with this configuration
    let data = await EleventyFetch(requestUrl, {
        directory: ".11ty-cache",
        duration: cacheDuration,
        type: "json",
        fetchOptions: {
            method: "POST",
            headers: requestHeaders,
            body: body
        }
    });

    return data;
}


/*
    This function fetches video game data from the IGDB API
    using paginated requests.
    It only fetches games with total ratings over the minimum;
    otherwise, this process will take several minutes to complete.
*/
async function fetchGames() {
    let offset = 0;
    let allGameData = [];
    let data = [];

    // Do the following repeatedly:
    do {

        try {
            // Fetch the current set of data with the current offset 
            data = await igdbFetch('games', `
                fields id, name, slug, first_release_date, 
                platforms.name, platforms.slug, genres.name, summary,
                involved_companies.company.name, cover.url, screenshots.url;
                
                where total_rating > ${MIN_GAME_RATING} & version_parent = null;
                limit ${RECORD_LIMIT_GAME}; 
                offset ${offset};
            `);

            // We need to some things to each game object we received:
            data = data.map(game => {
                // Process screenshots if any are available
                let screenshots = game.screenshots;

                if (screenshots) {
                    /*
                        Each screenshot's url has "t_thumb", which renders it as a tiny thumbnail.
                        Change each occurrence of that to "t_720p", which gives a higher-quality screenshot.
                        Plus, IGDB returns screenshot urls without the "https:" part.
                        We also need to add the "https:" to the beginning of each url.
                    */
                    screenshots = screenshots.map(s => {
                        let newUrl = "https:" + s.url.replace("t_thumb", "t_720p");
                        return newUrl;
                    });
                } else {
                    // Otherwise, use an empty array for screenshots
                    screenshots = [];
                }

                // Do the same for the game's cover image
                let cover = game.cover ? "https:" + game.cover.url.replace("t_thumb", "t_720p") : "";

                // "Flatten" the involved_companies value (which is an array of objects containing a name)
                let involved_companies = game.involved_companies ? game.involved_companies.map(c => c.company.name) : [];

                // Return the same game object, now with their edited screenshots
                return {
                    ...game,
                    involved_companies,
                    screenshots,
                    cover
                };
            });
        } catch (error) {
            // If anything goes wrong, log the error and return an empty array
            console.error("ERROR: Could not fetch game data from IGDB.");
            console.log(error);

            data = [];
        }

        // Append this data to the final data list
        allGameData.push(...data);

        // Increase the offset
        offset += RECORD_LIMIT_GAME;

    } while (data.length > 0)
    // Keep doing this until the data is an empty array

    return allGameData;
}


// This function fetches video game console data from the IGDB API.
async function fetchPlatforms() {
    let data = [];
    
    try {
        data = await igdbFetch('platforms', `
            fields id, name, slug, abbreviation;
            sort name asc;
            limit ${RECORD_LIMIT_PLATFORM};
        `);
    } catch (error) {
        // If anything goes wrong, log the error and return an empty array
        console.error("ERROR: Could not fetch platform data from IGDB.");
        console.log(error);

        data = [];
    }

    return data;
}


exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}) => {
    const { createNode } = actions;

    // Fetch the games and add them as GraphQL data
    let gameData = await fetchGames();

    gameData.forEach(game => {
        createNode({
            ...game,
            igdbId: game.id,
            id: createNodeId(`game__${game.id}`),
            parent: null,
            children: [],
            internal: {
                type: 'game',
                contentDigest: createContentDigest(game),
            }
        });
    });


    // Fetch the platforms and add them as GraphQL data
    let platformData = await fetchPlatforms();

    platformData.forEach(platform => {
        createNode({
            ...platform,
            igdbId: platform.id,
            id: createNodeId(`platform__${platform.id}`),
            parent: null,
            children: [],
            internal: {
                type: 'platform',
                contentDigest: createContentDigest(platform),
            }
        });
    });
}