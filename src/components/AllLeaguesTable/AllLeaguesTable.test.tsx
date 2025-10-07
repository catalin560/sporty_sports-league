import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import useLeaguesData from "../../hooks/LeaguesData/useLeaguesData";
import useBadgeModal from "../../hooks/BadgeModal/useBadgeModal";
import { useQuery } from "@tanstack/react-query";
import AllLeaguesTable from ".";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { message } from "antd";

vi.mock("../../hooks/LeaguesData/useLeaguesData");
vi.mock("../../hooks/BadgeModal/useBadgeModal");
vi.mock("@tanstack/react-query");

const allLeaguesResponseMock = {
    leagues: [
        {
            idLeague: "4328",
            strLeague: "English Premier League",
            strSport: "Soccer",
            strLeagueAlternate: "Premier League, EPL"
        }
    ]
};

describe("AllLeaguesTable Component Tests", () => {
    const mockSetLeagues = vi.fn();
    const mockSetLeagueId = vi.fn();

    beforeEach(() => {
        (useLeaguesData as Mock).mockReturnValue({
            setLeagues: mockSetLeagues,
            filteredLeagues: null
        });
        (useBadgeModal as Mock).mockReturnValue({ setLeagueId: mockSetLeagueId });
        (useQuery as Mock).mockReturnValue({
            data: allLeaguesResponseMock,
            error: null,
            isLoading: false
        });
    });

    it("should render table on screen", async () => {
        const { getByTestId, findByText } = render(<AllLeaguesTable />);

        expect(getByTestId("all-leagues-table")).toBeInTheDocument();

        const text = await findByText("English Premier League");
        expect(text).toBeInTheDocument();
    });

    it("should call setLeagues when data is loaded", () => {
        render(<AllLeaguesTable />);

        expect(mockSetLeagues).toHaveBeenCalledWith(allLeaguesResponseMock.leagues);
    });

    it("should call setLeagueId when row is clicked", async () => {
        const user = userEvent.setup();
        const { findByText } = render(<AllLeaguesTable />);

        const leagueRow = await findByText("English Premier League");
        await user.click(leagueRow);

        expect(mockSetLeagueId).toHaveBeenCalledWith("4328");
    });

    it("should display filtered leagues when available", async () => {
        const filteredLeagues = [
            {
                idLeague: "1234",
                strLeague: "La Liga",
                strSport: "Soccer",
                strLeagueAlternate: "Spanish League"
            }
        ];

        (useLeaguesData as Mock).mockReturnValue({
            setLeagues: mockSetLeagues,
            filteredLeagues
        });

        const { findByText, queryByText } = render(<AllLeaguesTable />);

        const text = await findByText("La Liga");
        expect(text).toBeInTheDocument();
        expect(queryByText("English Premier League")).not.toBeInTheDocument();
    });

    it("should handle loading state", () => {
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: null,
            isLoading: true
        });

        const { getByTestId } = render(<AllLeaguesTable />);

        const table = getByTestId("all-leagues-table");
        expect(table.closest(".ant-spin-container")).toHaveClass("ant-spin-blur");
    });

    it("should handle error state", () => {
        const mockError = new Error("Mock Error");

        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: mockError,
            isLoading: false
        });

        render(<AllLeaguesTable />);

        expect(message.error).toHaveBeenCalledWith(mockError.message);
    });
});
