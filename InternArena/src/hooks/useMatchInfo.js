import { useQuery } from "@tanstack/react-query";

export const useMatchInfo = (matchId) => {
    return useQuery({
        queryKey: ["matchInfo", matchId],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/match/${matchId}`);
            if (!response.ok) throw new Error("Failed to fetch match info");
            return response.json();
        },
        refetchInterval: 10000, 
        enabled: !!matchId,
    });
};