import { createContext, useMemo, useState, type ReactNode } from "react";
import BadgeModal from "../../components/BadgeModal";

type LeagueIdType = string | null;

interface BadgeModalContextType {
    setLeagueId: React.Dispatch<React.SetStateAction<LeagueIdType>>;
}

export const BadgeModalContext = createContext<BadgeModalContextType>(null!);

const BadgeModalProvider = ({ children }: { children: ReactNode }) => {
    const [leagueId, setLeagueId] = useState<LeagueIdType>(null);

    const onClose = () => {
        setLeagueId(null);
    };

    const contextValue = useMemo(() => ({ setLeagueId }), []);

    return (
        <>
            <BadgeModalContext value={contextValue}>{children}</BadgeModalContext>

            <BadgeModal leagueId={leagueId} onClose={onClose} />
        </>
    );
};

export default BadgeModalProvider;
