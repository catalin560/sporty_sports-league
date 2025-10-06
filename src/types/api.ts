export interface LeagueData {
    idLeague: string;
    strLeague: string;
    strSport: string;
    strLeagueAlternate: string;
}

export interface AllLeaguesResponse {
    leagues: LeagueData[];
}

export interface LeagueBadgeData {
    strSeason: string;
    strBadge: string;
}

export interface LeagueBadgeResponse {
    seasons: LeagueBadgeData[];
}
