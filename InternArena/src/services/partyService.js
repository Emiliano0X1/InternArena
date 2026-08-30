import apiClient from "./api";

/**
 * Party Service - API integration based on endpoints_reference.md
 */

/**
 * 1.3. Crear sala inicial (Lobby en espera)
 * POST /api/v1/partys/create?admin_id={admin_id}
 * 
 * @param {number|string} adminId - ID of the admin user (defaults to 1)
 * @returns {Promise<Object>} Created Party object with party_id, invitation_code, party_status="WAITING", etc.
 */
export const createPartyDefault = async (adminId = 1) => {
    const response = await apiClient.post("/api/v1/partys/create", null, {
        params: { admin_id: adminId }
    });
    return response.data;
};

/**
 * 1.2. Obtener sala por ID
 * GET /api/v1/partys/{id}
 * 
 * @param {number|string} partyId
 * @returns {Promise<Object>} Party object
 */
export const getPartyById = async (partyId) => {
    const response = await apiClient.get(`/api/v1/partys/${partyId}`);
    return response.data;
};

/**
 * 1.1. Obtener todas las salas
 * GET /api/v1/partys
 */
export const getAllParties = async () => {
    const response = await apiClient.get("/api/v1/partys");
    return response.data;
};

/**
 * 1.4. Unir nuevo jugador a una sala mediante código de invitación
 * POST /api/v1/partys/completeParty/newPlayer?user_id={user_id}&invitation_code={invitation_code}
 * 
 * @param {Object} payload
 * @param {number|string} payload.userId - ID of the joining user
 * @param {string} payload.invitationCode - 6-digit party invitation code
 * @returns {Promise<Object>} Updated Party object with new player in players list
 */
export const addNewPlayerToWaitingParty = async ({ userId, invitationCode }) => {
    const response = await apiClient.post("/api/v1/partys/completeParty/newPlayer", null, {
        params: {
            user_id: userId,
            invitation_code: invitationCode
        }
    });
    return response.data;
};

// Backward-compatibility alias
export const joinPartyByCode = (userId, invitationCode) =>
    addNewPlayerToWaitingParty({ userId, invitationCode });

/**
 * 1.5. Iniciar partida y generar problemas (completeParty)
 * POST /api/v1/partys/completeParty
 * Body: { party_id, difficulty, partyPrize, endTime }
 */
export const completeParty = async (partyData) => {
    const response = await apiClient.post("/api/v1/partys/completeParty", partyData);
    return response.data;
};

/**
 * 1.7. Eliminar / Cancelar sala (Host)
 * DELETE /api/v1/partys/{id}
 * 
 * @param {number|string} partyId
 * @returns {Promise<void>}
 */
export const deleteParty = async (partyId) => {
    const response = await apiClient.delete(`/api/v1/partys/${partyId}`);
    return response.data;
};

/**
 * 1.8. Salir de una partida en curso (Leave Active Party)
 * POST /api/v1/partys/{id}/leave?user_id={userId}
 * O alternativo: POST /api/v1/partys/leave?party_id={partyId}&user_id={userId}
 * 
 * @param {Object|number|string} partyIdOrOptions - partyId o { partyId, userId }
 * @param {number|string} [optionalUserId] - ID del usuario si el primer argumento es partyId
 * @returns {Promise<Object>} Party actualizado o confirmación de salida
 */
export const leaveActiveParty = async (partyIdOrOptions, optionalUserId) => {
    let partyId;
    let userId;

    if (typeof partyIdOrOptions === "object" && partyIdOrOptions !== null) {
        partyId = partyIdOrOptions.partyId ?? partyIdOrOptions.party_id ?? partyIdOrOptions.id;
        userId = partyIdOrOptions.userId ?? partyIdOrOptions.user_id;
    } else {
        partyId = partyIdOrOptions;
        userId = optionalUserId;
    }

    if (!partyId) {
        throw new Error("partyId is required to leave active party");
    }

    const response = await apiClient.post(`/api/v1/partys/${partyId}/leave`, null, {
        params: userId ? { user_id: userId } : {}
    });
    return response.data;
};

/**
 * 1.9. Salir de una sala como jugador en espera (Leave Party - Caso A)
 * DELETE /api/v1/players/{playerId}
 * 
 * @param {number|string} playerId
 * @returns {Promise<void>}
 */
export const leavePartyAsPlayer = async (playerId) => {
    const response = await apiClient.delete(`/api/v1/players/${playerId}`);
    return response.data;
};

/**
 * Helper unificado para salir de una partida o sala de espera
 * @param {Object} options
 * @param {number|string} [options.partyId] - ID de la sala si es el Host cancelando o partida activa
 * @param {number|string} [options.userId] - ID del usuario saliendo (para partida activa)
 * @param {number|string} [options.playerId] - ID del jugador saliendo (para lobby en espera)
 * @param {boolean} [options.isHost] - Si el usuario que sale es el anfitrión
 * @param {boolean} [options.isActiveParty] - Si la partida está activa (ACTIVE)
 */
export const leaveParty = async ({ partyId, userId, playerId, isHost = false, isActiveParty = false } = {}) => {
    // Si la partida está activa o se envió explícitamente userId + partyId sin playerId
    if ((isActiveParty || (userId && partyId && !playerId)) && partyId && userId) {
        return await leaveActiveParty({ partyId, userId });
    }
    if (isHost && partyId) {
        return await deleteParty(partyId);
    }
    if (playerId) {
        return await leavePartyAsPlayer(playerId);
    }
    if (partyId && userId) {
        return await leaveActiveParty({ partyId, userId });
    }
    if (partyId) {
        return await deleteParty(partyId);
    }
};

export default {
    createPartyDefault,
    getPartyById,
    getAllParties,
    addNewPlayerToWaitingParty,
    joinPartyByCode,
    completeParty,
    deleteParty,
    leaveActiveParty,
    leavePartyAsPlayer,
    leaveParty,
};

