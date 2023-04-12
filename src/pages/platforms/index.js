import * as React from "react"
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";


// This page displays a list of every platform in the data source.
const PlatformDirectoryPage = ({ data }) => {

    // Compose a collection of list elements made from each platform node
    let platformList = data.allPlatform.nodes.map(platform => {
        const { igdbId, name } = platform;

        // Each list item links to the corresponding platform's page
        return (
            <li key={igdbId}>
                <Link to={'/platforms/' + igdbId}>{name}</Link>
            </li>
        );
    });

    // Render the page and list
    return (
        <Layout pageTitle="All Platforms">
            <p>Select a platform to view a list of games that were released on it.</p>
            <ul>{platformList}</ul>
        </Layout>
    );
};


// Query every platform's IGDB ID, name, and abbreviation
export const query = graphql`
    query {
        allPlatform {
            nodes {
                igdbId
                name
                abbreviation
            }
        }
    }
`;

export const Head = () => <title>All Platforms</title>;
export default PlatformDirectoryPage;
