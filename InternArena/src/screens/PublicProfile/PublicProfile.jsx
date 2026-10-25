import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Header from "../LandingPage/components/Header";
import ProfileBannerHeader from "./components/ProfileBannerHeader";
import UserStatsWidget from "./components/UserStatsWidget";
import ActivityFeed from "./components/ActivityFeed";
import usePublicProfile from "../../hooks/usePublicProfile";

function PublicProfile() {
    const { id, username } = useParams();
    const identifier = id || username || "1";

    const {
        profile,
        isLoadingProfile,
        activityData,
        isLoadingActivity,
        page,
        setPage,
        totalPages,
        totalElements,
    } = usePublicProfile(identifier);

    if (isLoadingProfile) {
        return (
            <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
                <Header />
                <Container maxWidth="xl" sx={{ py: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress color="primary" />
                </Container>
            </Box>
        );
    }

    if (!profile) {
        return (
            <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
                <Header />
                <Container maxWidth="xl" sx={{ py: 12, textAlign: "center" }}>
                    <Typography variant="h5" color="error">
                        Player profile not found.
                    </Typography>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
            <Header />

            <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 2.5, md: 4 } }}>
                {/* 1. Hero Profile Banner with Equipped Cosmetics */}
                <ProfileBannerHeader profile={profile} />

                {/* 2. Main Profile Grid */}
                <Grid container spacing={4} alignItems="flex-start">
                    {/* Left Column: User Statistics Widget */}
                    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                        <UserStatsWidget profile={profile} />
                    </Grid>

                    {/* Right Column: Paginated Activity Feed */}
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                        <ActivityFeed
                            posts={activityData?.content || []}
                            page={page}
                            totalPages={totalPages}
                            totalElements={totalElements}
                            onPageChange={setPage}
                            isLoading={isLoadingActivity}
                            userAvatar={profile.avatarUrl}
                            username={profile.username}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default PublicProfile;
