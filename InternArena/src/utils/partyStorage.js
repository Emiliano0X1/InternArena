/**
 * Utilities for persistent client-side party storage in sessionStorage
 */

const PARTY_ID_KEY = "internarena_party_id";
const PARTY_SESSION_KEY = "internarena_party_session";

/**
 * Save party session to sessionStorage
 * @param {Object} party - Party object from API
 */
export const savePartySession = (party) => {
    if (!party) return;
    try {
        if (party.party_id) {
            sessionStorage.setItem(PARTY_ID_KEY, String(party.party_id));
        }
        sessionStorage.setItem(PARTY_SESSION_KEY, JSON.stringify(party));
    } catch (e) {
        console.error("Failed to save party session to sessionStorage:", e);
    }
};

/**
 * Retrieve the current party_id from sessionStorage
 * @returns {string|null} party_id
 */
export const getStoredPartyId = () => {
    try {
        return sessionStorage.getItem(PARTY_ID_KEY);
    } catch (e) {
        console.error("Failed to get party_id from sessionStorage:", e);
        return null;
    }
};

/**
 * Retrieve the complete party session object from sessionStorage
 * @returns {Object|null} party session object
 */
export const getStoredPartySession = () => {
    try {
        const stored = sessionStorage.getItem(PARTY_SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        console.error("Failed to parse party session from sessionStorage:", e);
        return null;
    }
};

const PLAYER_ID_KEY = "internarena_player_id";
const USER_ID_KEY = "internarena_user_id";

/**
 * Save player ID to sessionStorage
 * @param {string|number} playerId
 */
export const saveStoredPlayerId = (playerId) => {
    if (!playerId) return;
    try {
        sessionStorage.setItem(PLAYER_ID_KEY, String(playerId));
    } catch (e) {
        console.error("Failed to save player_id to sessionStorage:", e);
    }
};

/**
 * Get stored player ID from sessionStorage
 * @returns {string|null}
 */
export const getStoredPlayerId = () => {
    try {
        return sessionStorage.getItem(PLAYER_ID_KEY);
    } catch (e) {
        console.error("Failed to get player_id from sessionStorage:", e);
        return null;
    }
};

/**
 * Clear party session from sessionStorage
 */
export const clearStoredPartySession = () => {
    try {
        sessionStorage.removeItem(PARTY_ID_KEY);
        sessionStorage.removeItem(PARTY_SESSION_KEY);
        sessionStorage.removeItem(PLAYER_ID_KEY);
        // Clean legacy/alternate keys from endpoints_reference.md
        sessionStorage.removeItem("active_party_id");
        sessionStorage.removeItem("active_invitation_code");
    } catch (e) {
        console.error("Failed to clear party session from sessionStorage:", e);
    }
};

