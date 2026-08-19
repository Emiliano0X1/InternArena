import { useQuery } from "@tanstack/react-query";
import Ranking from "./Ranking";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListIcon from "@mui/icons-material/FormatListNumbered";
import Paper from "@mui/material/Paper";

const fetchRankings = async () => {
    // If VITE_API_URL is missing, mock rankings for visual preview.
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        return [
            { place: "3rd place", time: "2 hours ago" },
            { place: "1st place", time: "5 hours ago" },
            { place: "2nd place", time: "1 day ago" },
        ];
    }
    const response = await fetch(`${apiUrl}/api/rankings`);
    if (!response.ok) throw new Error("Failed to fetch rankings");
    return response.json();
};

function RecentRankings() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["rankings"],
        queryFn: fetchRankings,
    });

    return (
        <Paper 
            sx={{ 
                width: "100%", 
                mt: 3, 
                p: 3, 
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                <ListIcon sx={{ color: "primary.main", fontSize: 20 }} />
                <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
                    Recent Rankings
                </Typography>
            </Box>

            {isLoading && (
                <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                    Loading rankings...
                </Typography>
            )}

            {isError && !data && (
                <Typography variant="body2" sx={{ color: "error.main" }}>
                    Could not load rankings.
                </Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {data?.map((ranking, index) => (
                    <Ranking key={index} data={ranking} />
                )) ?? (
                    <>
                        <Ranking data={{ place: "3rd place", time: "2 hours ago" }} />
                        <Ranking data={{ place: "1st place", time: "5 hours ago" }} />
                        <Ranking data={{ place: "2nd place", time: "1 day ago" }} />
                    </>
                )}
            </Box>
        </Paper>
    );
}

export default RecentRankings;
