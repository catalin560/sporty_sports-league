import "@ant-design/v5-patch-for-react-19";
import AllLeaguesTable from "./components/AllLeaguesTable";
import { Flex } from "antd";
import LeaguesSearchBar from "./components/LeaguesSearchBar";
import SportsDropdown from "./components/SportsDropdown";

function App() {
    return (
        <Flex style={{ padding: "0 8px" }} vertical gap="8px">
            <Flex gap="8px">
                <LeaguesSearchBar />
                <SportsDropdown />
            </Flex>

            <AllLeaguesTable />
        </Flex>
    );
}

export default App;
