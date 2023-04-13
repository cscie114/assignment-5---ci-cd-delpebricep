import React from "react";
import { render } from "@testing-library/react";
import { ReleaseDate } from "../../src/components/Game";


// This timestamp should convert to "January 01, 2023"
const dateUnix = 1672549200;


describe("Title", () => {
    it("Renders correctly", () => {
        const element = <ReleaseDate dateUnix={dateUnix} />;
        expect(element).toMatchSnapshot();
    });

    it("Displays the correct date", () => {
        const { getByTestId } = render(<ReleaseDate dateUnix={dateUnix} />);
        expect(getByTestId("release-date")).toHaveTextContent("Original Release Date: January 01, 2023");
    });
})