import { createContext, type ReactNode } from "react";
import useManageLeaguesData from "../../hooks/LeaguesData/useManageLeaguesData";

export const LeaguesDataContext = createContext<ReturnType<typeof useManageLeaguesData>>(null!);

const LeaguesDataProvider = ({ children }: { children: ReactNode }) => {
    const leaguesData = useManageLeaguesData();
    return <LeaguesDataContext value={leaguesData}>{children}</LeaguesDataContext>;
};

export default LeaguesDataProvider;
