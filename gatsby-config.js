/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: `assignment-4-gatsby`,
		description: `Starter Gatsby project for Assignment 4`,
		course: `CSCI E-114`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	plugins: [
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,

		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `game_reviews`,
				path: `${__dirname}/game_reviews/`,
			}
		},
		`gatsby-transformer-remark`
	]
};
