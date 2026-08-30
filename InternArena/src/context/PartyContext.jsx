import { createContext, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { createPartyDefault, getPartyById } from "../services/partyService";
import { DEFAULT_ADMIN_ID } from "../constants/party";
import {
    savePartySession,
    getStoredPartyId,
    getStoredPartySession,
    clearStoredPartySession,
} from "../utils/partyStorage";

const PartyContext = createContext(null);

export const PartyProvider = ({ children }) => {
    const [currentParty, setCurrentParty] = useState(() => getStoredPartySession());
    const [partyId, setPartyId] = useState(() => getStoredPartyId());
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
     * Returns the created party on success, or throws error and opens ErrorDialog on failure.
     */
    const createLobby = useCallback(async (adminId = DEFAULT_ADMIN_ID) => {
        setIsLoading(true);
        try {
            const party = await createPartyDefault(adminId);
            setCurrentParty(party);
            if (party?.party_id) {
                setPartyId(String(party.party_id));
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
    }, []);

    const closeErrorDialog = useCallback(() => {
        setErrorDialog((prev) => ({ ...prev, open: false }));
    }, []);

    const value = {
        currentParty,
        partyId,
        invitationCode: currentParty?.invitation_code || null,
        isLoading,
        errorDialog,
        createLobby,
        refreshParty,
        clearParty,
        closeErrorDialog,
        setCurrentParty,
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

export const useParty = () => {
    const context = useContext(PartyContext);
    if (!context) {
        throw new Error("useParty must be used within a PartyProvider");
    }
    return context;
};

export default PartyContext;
