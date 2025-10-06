import { use } from "react";
import { LeaguesDataContext } from "../../contexts/LeaguesData";

const useLeaguesData = () => {
    return use(LeaguesDataContext);
};

export default useLeaguesData;
