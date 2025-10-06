import { Select } from "antd";
import useLeaguesData from "../../hooks/LeaguesData/useLeaguesData";
import { useMemo } from "react";

const SportsDropdown = () => {
    const { leaguesSports, setSportFilter } = useLeaguesData();

    const sportsDropdownOptions = useMemo(
        () => leaguesSports.map((sport) => ({ value: sport, label: sport })),
        [leaguesSports]
    );

    return (
        <Select
            data-testid="sports-dropdown"
            allowClear
            placeholder="Sports"
            style={{ minWidth: "150px" }}
            disabled={!leaguesSports.length}
            options={sportsDropdownOptions}
            onChange={(value: string) => setSportFilter(value)}
        />
    );
};

export default SportsDropdown;
