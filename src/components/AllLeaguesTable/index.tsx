import { useQuery } from "@tanstack/react-query";
import apiClient from "../../boot/apiClient";
import { message, Table } from "antd";
import type { AllLeaguesResponse } from "../../types/api";
import useLeaguesData from "../../hooks/LeaguesData/useLeaguesData";
import { useEffect } from "react";
import useBadgeModal from "../../hooks/BadgeModal/useBadgeModal";

const leaguesTableColumns = [
    { title: "League", dataIndex: "strLeague" },
    { title: "Sport", dataIndex: "strSport" },
    { title: "Alternate", dataIndex: "strLeagueAlternate" }
];

const AllLeaguesTable = () => {
    const { setLeagues, filteredLeagues } = useLeaguesData();
    const { setLeagueId } = useBadgeModal();

    const { data, error, isLoading } = useQuery({
        queryKey: ["all-leagues"],
        queryFn: async ({ signal }) => {
            const { data } = await apiClient.get<AllLeaguesResponse>("/all_leagues.php", {
                signal
            });
            return data;
        }
    });

    if (error) {
        message.error(error.message);
    }

    useEffect(() => {
        if (data?.leagues.length) {
            setLeagues(data.leagues);
        }
    }, [data]);

    return (
        <Table
            data-testid="all-leagues-table"
            rowKey={({ idLeague }) => idLeague}
            dataSource={filteredLeagues ? filteredLeagues : data?.leagues}
            columns={leaguesTableColumns}
            loading={isLoading}
            pagination={false}
            onRow={({ idLeague }) => ({ onClick: () => setLeagueId(idLeague) })}
        />
    );
};

export default AllLeaguesTable;
