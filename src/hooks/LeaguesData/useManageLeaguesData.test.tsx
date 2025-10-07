import { describe, expect, it } from "vitest";
import useManageLeaguesData from "./useManageLeaguesData";
import { renderHook } from "@testing-library/react";
import { act } from "react";

const mockLeagues = [
    {
        idLeague: "1",
        strLeague: "English Premier League",
        strSport: "Soccer",
        strLeagueAlternate: "EPL"
    },
    {
        idLeague: "2",
        strLeague: "English League Championship",
        strSport: "Soccer",
        strLeagueAlternate: "Championship"
    },
    {
        idLeague: "3",
        strLeague: "NBA",
        strSport: "Basketball",
        strLeagueAlternate: "National Basketball Association"
    }
];

describe("useManageLeaguesData Hook Tests", () => {
    it("should initialize with empty leaguesSports and filteredLeagues", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        expect(result.current.leaguesSports).toEqual([]);
        expect(result.current.filteredLeagues).toEqual([]);
    });

    it("should update leaguesSports and compute list correctly", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        act(() => {
            result.current.setLeagues(mockLeagues);
        });

        expect(result.current.leaguesSports).toEqual(["Soccer", "Basketball"]);
        expect(result.current.leaguesSports).toHaveLength(2);
    });

    it("should filter leagues by name", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        act(() => {
            result.current.setLeagues(mockLeagues);
        });

        act(() => {
            result.current.setLeagueNameFilter("premier");
        });

        expect(result.current.filteredLeagues).toHaveLength(1);
        expect(result.current.filteredLeagues).toEqual([
            {
                idLeague: "1",
                strLeague: "English Premier League",
                strSport: "Soccer",
                strLeagueAlternate: "EPL"
            }
        ]);
    });

    it("should return empty array when no leagues match name filter", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        act(() => {
            result.current.setLeagues(mockLeagues);
        });

        act(() => {
            result.current.setLeagueNameFilter("nonexistent");
        });

        expect(result.current.filteredLeagues).toEqual([]);
    });

    it("should clear filters when empty string is passed to setLeagueNameFilter", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        act(() => {
            result.current.setLeagues(mockLeagues);
        });

        act(() => {
            result.current.setLeagueNameFilter("premier");
        });

        expect(result.current.filteredLeagues).toHaveLength(1);

        act(() => {
            result.current.setLeagueNameFilter("");
        });

        expect(result.current.filteredLeagues).toHaveLength(3);
    });

    it("should filter leagues by sport", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        act(() => {
            result.current.setLeagues(mockLeagues);
        });

        act(() => {
            result.current.setSportFilter("Soccer");
        });

        expect(result.current.filteredLeagues).toHaveLength(2);
        expect(result.current.filteredLeagues?.every(({ strSport }) => strSport === "Soccer")).toBe(
            true
        );
    });

    it("should clear filters when empty string is passed to setSportFilter", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        act(() => {
            result.current.setLeagues(mockLeagues);
        });

        act(() => {
            result.current.setSportFilter("Soccer");
        });

        expect(result.current.filteredLeagues).toHaveLength(2);

        act(() => {
            result.current.setSportFilter("");
        });

        expect(result.current.filteredLeagues).toHaveLength(3);
    });

    it("should combines filters for leagueName + sport", () => {
        const { result } = renderHook(() => useManageLeaguesData());

        act(() => {
            result.current.setLeagues(mockLeagues);
        });

        act(() => {
            result.current.setLeagueNameFilter("english");
            result.current.setSportFilter("Soccer");
        });
        expect(result.current.filteredLeagues).toHaveLength(2);
        expect(result.current.filteredLeagues?.map(({ idLeague }) => idLeague)).toEqual(["1", "2"]);

        act(() => {
            result.current.setLeagueNameFilter("premier");
        });
        expect(result.current.filteredLeagues).toHaveLength(1);
        expect(result.current.filteredLeagues?.[0].idLeague).toBe("1");

        act(() => {
            result.current.setSportFilter("Basketball");
        });
        expect(result.current.filteredLeagues).toEqual([]);
    });
});
