import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Header from "../LandingPage/components/Header";
import InventoryHeader from "./components/InventoryHeader";
import LiveProfilePreview from "./components/LiveProfilePreview";
import CosmeticsTab from "./components/CosmeticsTab";
import RedeemablesTab from "./components/RedeemablesTab";
import ErrorDialog from "../../components/ErrorDialog";
import useInventory from "../../hooks/useInventory";

function Inventory() {
    const navigate = useNavigate();
    const [activeMainTab, setActiveMainTab] = useState("digital");
    const [toast, setToast] = useState({ open: false, severity: "success", message: "" });
    const [errorModal, setErrorModal] = useState({ open: false, message: "" });

    const {
        draft,
        hasUnsavedChanges,
        equipItem,
        resetPreview,
        saveChanges,
        isSaving,
        digitalCosmetics,
        redeemableItems,
        profile,
    } = useInventory();

    const handleSave = async () => {
        try {
            await saveChanges();
            setToast({
                open: true,
                severity: "success",
                message: "Cosmetics equipped and saved successfully!",
            });
        } catch (err) {
            console.error("Failed to save cosmetics:", err);
            setErrorModal({
                open: true,
                message: err?.message || "Failed to persist cosmetic changes. Please try again.",
            });
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
            <Header />

            <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
                <InventoryHeader
                    activeMainTab={activeMainTab}
                    onChangeTab={setActiveMainTab}
                    onBack={() => navigate("/")}
                    onSave={handleSave}
                    isSaving={isSaving}
                    hasUnsavedChanges={hasUnsavedChanges}
                />

                <Grid container spacing={4} alignItems="flex-start">
                    {/* Left Column: Live Profile Preview */}
                    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                        <LiveProfilePreview
                            draft={draft}
                            hasUnsavedChanges={hasUnsavedChanges}
                            onReset={resetPreview}
                            profile={profile}
                            digitalCosmetics={digitalCosmetics}
                        />
                    </Grid>

                    {/* Right Column: Inventory Items Grid */}
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                        {activeMainTab === "digital" ? (
                            <CosmeticsTab
                                items={digitalCosmetics}
                                draft={draft}
                                onEquip={equipItem}
                            />
                        ) : (
                            <RedeemablesTab items={redeemableItems} />
                        )}
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast((t) => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setToast((t) => ({ ...t, open: false }))}
                    severity={toast.severity}
                    variant="filled"
                    sx={{ width: "100%", borderRadius: 3 }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>

            <ErrorDialog
                open={errorModal.open}
                title="Failed to Save Cosmetics"
                message={errorModal.message}
                status="error"
                onClose={() => setErrorModal({ open: false, message: "" })}
            />
        </Box>
    );
}

export default Inventory;
