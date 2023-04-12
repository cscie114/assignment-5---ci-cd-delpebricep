import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import GameList from "../../components/GameList";


// This page displays a list of every game on the platform with a given IGDB ID.
const PlatformPage = ({ data }) => {
	const { platform, allGame } = data;
	const { name, abbreviation } = platform;

	// Build a string for the page's title. Start with the platform's name.
	let title = name;

	// If an abbreviation exists for this platform, attach it to the name in parentheses
	if (abbreviation) {
		title += ` (${abbreviation})`;
	}
	
	// Render the page and game list
	return (
		<Layout pageTitle={title}>
			<p>We have a total of <b>{allGame.totalCount}</b> records for games on {name}.</p>
			<GameList games={allGame.nodes} />
		</Layout>
	);
};


/*
	This GraphQL query fetches details about the platform with a certain IGDB ID
	and a collection of every game that was released on it.
*/
export const query = graphql`
	query ($igdbId: Int) {
		platform(igdbId: {eq: $igdbId}) {
			name
			abbreviation
			slug
		}

		allGame(
			filter: {platforms: {elemMatch: {id: {eq: $igdbId}}}}
			sort: {name: ASC}
		) {
			nodes {
				name
				slug
				igdbId
			}
			totalCount
		}
	}
`;


// The <head> HTML element on this page should also show the name of the platform
export const Head = ({ data }) => { 
	return <title>Platform Page: { data.platform.name }</title>;
};

export default PlatformPage;

