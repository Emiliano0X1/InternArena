import Header from "./components/Header"
import RecentRankings from "./components/RecentRankings"
import SideProfile from "./components/SideProfile"
import Post from "./components/Post"
import ActiveMatches from "./components/ActiveMatches"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"; // Standard MUI Grid


function LandingPage(){
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
            <Header/>
            
            <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 2, md: 4 }, display: "flex", flexDirection: "column" }}>
                <Grid container spacing={{ xs: 3, lg: 4 }} sx={{ flex: 1, alignItems: "stretch" }}>
                    
                    {/* Left Column - Profile & Recent Rankings */}
                    <Grid size={{ xs: 12, md: 4, lg: 3 }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Box sx={{ position: { lg: "sticky" }, top: 88 }}>
                            <SideProfile/>   
                            <RecentRankings/> 
                        </Box>
                    </Grid>

                    {/* Center Column - Posts */}
                    <Grid size={{ xs: 12, md: 8, lg: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Post/>
                        <Post/>
                        <Post/>
                    </Grid>

                    {/* Right Column - Active Matches */}
                    <Grid size={{ xs: 12, lg: 3 }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Box sx={{ position: { lg: "sticky" }, top: 88, display: "flex", flexDirection: "column", gap: 3 }}>
                            <ActiveMatches/>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}

export default LandingPage