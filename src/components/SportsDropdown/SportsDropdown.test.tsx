import { render, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import SportsDropdown from ".";
import useLeaguesData from "../../hooks/LeaguesData/useLeaguesData";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/LeaguesData/useLeaguesData");

describe("SportsDropdown Component Tests", () => {
    const mockSetSportFilter = vi.fn();

    beforeEach(() => {
        (useLeaguesData as Mock).mockReturnValue({
            leaguesSports: ["Soccer"],
            setSportFilter: mockSetSportFilter
        });
    });

    it("should render dropdown on screen", () => {
        const { getByTestId } = render(<SportsDropdown />);

        expect(getByTestId("sports-dropdown")).toBeInTheDocument();
    });

    it("should be disabled when there is no data", () => {
        (useLeaguesData as Mock).mockReturnValue({
            leaguesSports: [],
            setSportFilter: mockSetSportFilter
        });

        const { getByTestId } = render(<SportsDropdown />);

        const dropdown = getByTestId("sports-dropdown");
        expect(within(dropdown).getByRole("combobox")).toBeDisabled();
    });

    it("should call setSportFilter onChange", async () => {
        const user = userEvent.setup();

        const { getByTestId, findByTitle } = render(<SportsDropdown />);

        const dropdown = getByTestId("sports-dropdown");
        const combobox = within(dropdown).getByRole("combobox");
        await user.click(combobox);

        const option = await findByTitle("Soccer");
        await user.click(option);

        expect(mockSetSportFilter).toHaveBeenCalledWith("Soccer");
    });
});
