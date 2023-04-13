import React from "react";
import { render } from "@testing-library/react";
import { GenreList } from "../../src/components/Game";


const genres = [
    { name: "Platformer" },
    { name: "Adventure" },
    { name: "RPG" },
    { name: "Action" }
];


describe("GenreList", () => {
    it("Renders correctly", () => {
        const element = <GenreList genres={genres} />;
        expect(element).toMatchSnapshot();
    });

    it("Displays a list of genres", () => {
        const { getByTestId } = render(<GenreList genres={genres} />);
        expect(getByTestId("genre-list")).toHaveTextContent("Platformer, Adventure, RPG, Action");
    });
})