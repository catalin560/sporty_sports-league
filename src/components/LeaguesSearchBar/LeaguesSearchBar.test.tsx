import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import LeaguesSearchBar from ".";
import useLeaguesData from "../../hooks/LeaguesData/useLeaguesData";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/LeaguesData/useLeaguesData");

describe("LeaguesSearchBar Component Tests", () => {
    const mockSetLeagueNameFilter = vi.fn();

    beforeEach(() => {
        (useLeaguesData as Mock).mockReturnValue({
            leaguesSports: ["Soccer"],
            setLeagueNameFilter: mockSetLeagueNameFilter
        });
    });

    it("should render search bar on screen", () => {
        const { getByTestId } = render(<LeaguesSearchBar />);

        expect(getByTestId("league-search-bar")).toBeInTheDocument();
    });

    it("should be disabled when there is no data", () => {
        (useLeaguesData as Mock).mockReturnValue({
            leaguesSports: [],
            setLeagueNameFilter: mockSetLeagueNameFilter
        });

        const { getByTestId } = render(<LeaguesSearchBar />);

        expect(getByTestId("league-search-bar")).toBeDisabled();
    });

    it("should call setLeagueNameFilter onChange", async () => {
        const user = userEvent.setup();

        const { getByTestId } = render(<LeaguesSearchBar />);

        const searchBar = getByTestId("league-search-bar");
        await user.type(searchBar, "Soccer");

        expect(mockSetLeagueNameFilter).toHaveBeenCalledWith("Soccer");
    });
});
