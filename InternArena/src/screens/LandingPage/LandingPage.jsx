import Header from "./components/Header"
import RecentRankings from "./components/RecentRankings"
import SideProfile from "./components/SideProfile"
import Post from "./components/Post"
import ActiveMatches from "./components/ActiveMatches"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function LandingPage(){

    return (
        <Box sx={{ height: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
            <Header/>
            <Container maxWidth={false} sx={{ flex: 1, minHeight: 0, py: 2 }}>
                <Box sx={{ display: "flex", gap: 2, height: "100%", minHeight: 0, overflow: "hidden" }}>
                    <Box className="scrollbar-hide" sx={{ width: 360, maxWidth: "36vw", overflowY: "auto", minWidth: 0, pr: 0.5 }}>
                        <SideProfile/>   
                        <RecentRankings/> 
                    </Box>

                    <Box className="scrollbar-hide" sx={{ flex: 1, overflowY: "auto", minWidth: 0, px: 0.5 }}>
                        <Post/>
                        <Post/>
                        <Post/>
                    </Box>

                    <Box className="scrollbar-hide" sx={{ width: 360, maxWidth: "36vw", overflowY: "auto", minWidth: 0, pl: 0.5 }}>
                        <ActiveMatches/>
                        <ActiveMatches/>
                        <ActiveMatches/>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default LandingPage