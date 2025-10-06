import { Input } from "antd";
import useLeaguesData from "../../hooks/LeaguesData/useLeaguesData";

const LeaguesSearchBar = () => {
    const { leaguesSports, setLeagueNameFilter } = useLeaguesData();

    const handleOnSearch = (value: string) => {
        setLeagueNameFilter(value);
    };

    return (
        <Input
            data-testid="league-search-bar"
            allowClear
            disabled={!leaguesSports.length}
            placeholder="Search League by Name"
            onChange={({ target }) => handleOnSearch(target.value)}
        />
    );
};

export default LeaguesSearchBar;
