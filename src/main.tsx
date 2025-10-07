import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./boot/queryClient.ts";
import LeaguesDataProvider from "./contexts/LeaguesData/index.tsx";
import BadgeModalProvider from "./contexts/BadgeModal/index.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <LeaguesDataProvider>
                <BadgeModalProvider>
                    <App />
                </BadgeModalProvider>
            </LeaguesDataProvider>
        </QueryClientProvider>
    </StrictMode>
);
