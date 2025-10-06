import { useMemo, useState } from "react";
import type { LeagueData } from "../../types/api";

interface FilterState {
    leagueName: string;
    sport: string;
}

interface FilterFlags {
    leagueNameEnabled: boolean;
    sportEnabled: boolean;
}

const useManageLeaguesData = () => {
    const [leagues, setLeagues] = useState<LeagueData[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        leagueName: "",
        sport: ""
    });
    const [filterFlags, setFilterFlags] = useState<FilterFlags>({
        leagueNameEnabled: false,
        sportEnabled: false
    });

    const setLeagueNameFilter = (value: string) => {
        setFilters((prev) => ({ ...prev, leagueName: value }));
        setFilterFlags((prev) => ({
            ...prev,
            leagueNameEnabled: Boolean(value)
        }));
    };

    const setSportFilter = (sport: string) => {
        setFilters((prev) => ({ ...prev, sport }));
        setFilterFlags((prev) => ({
            ...prev,
            sportEnabled: Boolean(sport)
        }));
    };

    const filteredLeagues = useMemo(() => {
        return leagues.filter((league) => {
            if (filterFlags.leagueNameEnabled && filters.leagueName) {
                const matchesName = league.strLeague
                    .toLowerCase()
                    .includes(filters.leagueName.toLowerCase());
                if (!matchesName) return false;
            }

            if (filterFlags.sportEnabled && filters.sport) {
                const matchesSport = league.strSport === filters.sport;
                if (!matchesSport) return false;
            }

            return true;
        });
    }, [leagues, filters, filterFlags]);

    const leaguesSports = useMemo(() => {
        return Array.from(new Set(leagues.map(({ strSport }) => strSport)));
    }, [leagues]);

    return {
        leaguesSports,
        filteredLeagues,
        setLeagues,
        setLeagueNameFilter,
        setSportFilter
    };
};

export default useManageLeaguesData;
