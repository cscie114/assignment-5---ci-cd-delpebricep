# CSCI E-114 Assignment 5 - CI/CD | Gatsby Game Museum (with a Quote)

This repository holds the code for Assignment #5, which borrows from Assignment #4 and applies the fundamentals of CI/CD.

**Project Site**: https://gatsby-game-museum.netlify.app/

## Local Application Setup 

### Step 1: Installation

To install this project, you must first clone this repository. 
Next, use your preferred shell/terminal application to navigate to the project's folder (e.g., ```cd assignment-5-ci-cd-delpebricep```).

While in the project's directory, run ```npm install``` to install the project's NPM dependencies.


### Step 2: Obtaining IGDB API Keys

Before you run the project, you will need a client ID, client secret, and access token from IGDB.
The IGDB API is the source of this project's remote data; without these items, the Gatsby site's data will be empty.

Some of the instructions in this section were taken from [the IGDB API documentation's "Getting Started" page](https://api-docs.igdb.com/#getting-started).


#### Getting the Client ID and Secret

1. Make a free [Twitch](https://dev.twitch.tv/login) account.
2. Ensure that Two Factor Authentication is [enabled](https://www.twitch.tv/settings/security).
3. Register the application in the [Twitch Developer Portal](https://dev.twitch.tv/console/apps/create).
4. [Manage](https://dev.twitch.tv/console/apps) the newly created application by giving it the name "Gatsby Game Museum" or anything else you like. Under the "OAuth Redirect URLs" field, you can add ```https://localhost:8000/```.
5. Generate a client secret by pressing [New Secret].
6. Copy the client ID and client secret to a safe place.


#### Getting the Access Token

Next, you will use the client ID and client secret to authenticate as a Twitch Developer and obtain the access key.
Detailed information can be found in the [Twitch Developer Docs](https://dev.twitch.tv/docs/authentication).

Open your preferred shell/terminal application. Use the ```curl``` command to make a POST request to ```https://id.twitch.tv/oauth2/token``` with the following query string parameters, substituting your client ID and client secret accordingly:

```
client_id=[your client ID goes here]
client_secret=[your client secret goes here]
grant_type=client_credentials
```

The whole command should look something like this:

```
curl -X POST https://id.twitch.tv/oauth2/token?client_id=[your client ID goes here]&client_secret=[your client secret goes here]&grant_type=client_credentials
```

The response will be a JSON object containing the access token and the number of seconds until the token expires.

```
{
    "access_token": "access12345token",
    "expires_in": 5587808,
    "token_type": "bearer"
}
```

The ```expires_in``` value shows you the number of seconds before ```access_token``` expires. By default, it will be 60 days. If you need to refresh your access token, repeat the steps in this section again.

Now that you have the access token, copy it to a safe place.


#### Creating an Environment File

Lastly, create a .env file at the root directory of your cloned repository. It must look like the followin, substituting the client ID, client secret, and access token accordingly:

```
IGDB_CLIENT_ID="[your client ID goes here]"
IGDB_CLIENT_SECRET="[your client secret goes here]"
IGDB_ACCESS_TOKEN="[your access token goes here]"
```

### Step 3: Running the Project

After completing the previous two steps, run ```npm start``` to execute the project.


## Assignment Components and Requirements

### CI Pipeline

The continuous integration pipeline for GitHub Actions is located in ```.github/workflows/ci.yml```. It makes use of a linter and a couple of React unit tests (```tests/unit/```).

### Netlify Serverless Function

The directory ```netlify/functions``` stores this project's sole serverless function, ```get-random-quote.js```. This function makes use of a seperate API called Quotable, which stores information about inspirational quotes said by famous people. 

The function fetches a random quote from the Quotable API. A component called Quote (```/src/components/Quote.js```) calls this function and displays the quote with special CSS. This component is used on the site's home page.