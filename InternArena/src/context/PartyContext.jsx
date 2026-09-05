import { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
    createPartyDefault,
    getPartyById,
    addNewPlayerToWaitingParty,
    deleteParty,
    leaveActiveParty,
    leavePartyAsPlayer,
} from "../services/partyService";
import { DEFAULT_ADMIN_ID } from "../constants/party";
import {
    savePartySession,
    getStoredPartyId,
    getStoredPartySession,
    clearStoredPartySession,
    saveStoredPlayerId,
    getStoredPlayerId,
} from "../utils/partyStorage";

const PartyContext = createContext(null);

export const PartyProvider = ({ children }) => {
    const [currentParty, setCurrentParty] = useState(() => getStoredPartySession());
    const [partyId, setPartyId] = useState(() => getStoredPartyId());
    const [guestUserId, setGuestUserId] = useState(() => sessionStorage.getItem("internarena_user_id") || "2");
    const [guestPlayerId, setGuestPlayerId] = useState(() => getStoredPlayerId());
    const [isLoading, setIsLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState({
        open: false,
        title: "",
        message: "",
        status: null,
    });

    // Sync state whenever currentParty changes
    useEffect(() => {
        if (currentParty?.party_id) {
            setPartyId(String(currentParty.party_id));
        }
    }, [currentParty]);

    /**
     * Initializes default party session via POST /api/v1/partys/create?admin_id={adminId}
     */
    const createLobby = useCallback(async (adminId = DEFAULT_ADMIN_ID) => {
        setIsLoading(true);
        try {
            const party = await createPartyDefault(adminId);
            setCurrentParty(party);
            if (party?.party_id) {
                setPartyId(String(party.party_id));
            }
            // If the host is also player #0, save host player ID if present
            if (party?.players?.length > 0 && party.players[0]?.player_id) {
                const hostPlayerId = String(party.players[0].player_id);
                setGuestPlayerId(hostPlayerId);
                saveStoredPlayerId(hostPlayerId);
            }
            savePartySession(party);
            setIsLoading(false);
            return party;
        } catch (err) {
            setIsLoading(false);
            const status = err.status || (err.originalError?.response?.status ?? null);
            const message =
                err.message ||
                "Failed to initialize lobby session. Please ensure backend server is active at http://localhost:8080.";
            
            setErrorDialog({
                open: true,
                title: "Failed to Create Lobby",
                message,
                status,
            });
            throw err;
        }
    }, []);

    /**
     * Guest joins waiting party via POST /api/v1/partys/completeParty/newPlayer?user_id={userId}&invitation_code={invitationCode}
     */
    const joinLobby = useCallback(async ({ userId, invitationCode }) => {
        setIsLoading(true);
        try {
            const party = await addNewPlayerToWaitingParty({ userId, invitationCode });
            setCurrentParty(party);
            if (party?.party_id) {
                setPartyId(String(party.party_id));
            }
            setGuestUserId(String(userId));
            sessionStorage.setItem("internarena_user_id", String(userId));

            // Extract newly joined player's player_id
            if (party?.players?.length > 0) {
                const latestPlayer = party.players[party.players.length - 1];
                if (latestPlayer?.player_id) {
                    const pId = String(latestPlayer.player_id);
                    setGuestPlayerId(pId);
                    saveStoredPlayerId(pId);
                }
            }

            savePartySession(party);
            setIsLoading(false);
            return party;
        } catch (err) {
            setIsLoading(false);
            const status = err.status || (err.originalError?.response?.status ?? null);
            const message =
                err.message ||
                `The party with invitation code "${invitationCode}" could not be joined. Please verify the code.`;

            setErrorDialog({
                open: true,
                title: "Failed to Join Lobby",
                message,
                status,
            });
            throw err;
        }
    }, []);

    /**
     * Leave or cancel lobby/match session.
     * Prioritizes POST /api/v1/partys/{partyId}/leave?user_id={userId}
     */
    const leaveParty = useCallback(async ({ playerId, partyId: targetPartyId, userId: targetUserId, isHost = false } = {}) => {
        setIsLoading(true);
        try {
            const effectivePartyId = targetPartyId || partyId || currentParty?.party_id;
            const effectiveUserId = targetUserId || guestUserId || sessionStorage.getItem("internarena_user_id");
            const effectivePlayerId = playerId || guestPlayerId || getStoredPlayerId();

            if (isHost && effectivePartyId && !effectiveUserId) {
                await deleteParty(effectivePartyId);
            } else if (effectivePartyId && effectiveUserId) {
                // Call POST /api/v1/partys/{id}/leave?user_id={userId}
                await leaveActiveParty({ partyId: effectivePartyId, userId: effectiveUserId });
            } else if (effectivePlayerId) {
                await leavePartyAsPlayer(effectivePlayerId);
            } else if (effectivePartyId) {
                await deleteParty(effectivePartyId);
            }

            clearStoredPartySession();
            setCurrentParty(null);
            setPartyId(null);
            setGuestPlayerId(null);
            setIsLoading(false);
            return true;
        } catch (err) {
            console.error("Failed to cleanly leave party from backend:", err);
            // Always clean client session regardless of network response
            clearStoredPartySession();
            setCurrentParty(null);
            setPartyId(null);
            setGuestPlayerId(null);
            setIsLoading(false);
            return false;
        }
    }, [guestPlayerId, partyId, guestUserId, currentParty]);

    /**
     * Explicit helper to leave an active match
     */
    const handleLeaveActiveParty = useCallback(async ({ partyId: targetPartyId, userId: targetUserId } = {}) => {
        const effectivePartyId = targetPartyId || partyId || currentParty?.party_id;
        const effectiveUserId = targetUserId || guestUserId || sessionStorage.getItem("internarena_user_id") || "1";
        return await leaveParty({
            partyId: effectivePartyId,
            userId: effectiveUserId,
            isActive: true,
        });
    }, [partyId, currentParty, guestUserId, leaveParty]);

    /**
     * Fetch latest party info by ID and sync storage
     */
    const refreshParty = useCallback(async (id) => {
        const targetId = id || partyId;
        if (!targetId) return null;
        try {
            const party = await getPartyById(targetId);
            setCurrentParty(party);
            savePartySession(party);
            return party;
        } catch (err) {
            console.error("Failed to refresh party info:", err);
            return null;
        }
    }, [partyId]);

    const clearParty = useCallback(() => {
        clearStoredPartySession();
        setCurrentParty(null);
        setPartyId(null);
        setGuestPlayerId(null);
    }, []);

    const closeErrorDialog = useCallback(() => {
        setErrorDialog((prev) => ({ ...prev, open: false }));
    }, []);

    const value = {
        currentParty,
        partyId,
        guestUserId,
        guestPlayerId,
        invitationCode: currentParty?.invitation_code || null,
        isLoading,
        errorDialog,
        createLobby,
        joinLobby,
        leaveParty,
        leaveLobby: leaveParty,
        leaveActiveParty: handleLeaveActiveParty,
        refreshParty,
        clearParty,
        closeErrorDialog,
        setCurrentParty,
        setGuestPlayerId,
    };

    return (
        <PartyContext.Provider value={value}>
            {children}
        </PartyContext.Provider>
    );
};

PartyProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useParty = () => {
    const context = useContext(PartyContext);
    if (!context) {
        throw new Error("useParty must be used within a PartyProvider");
    }
    return context;
};

export default PartyContext;
