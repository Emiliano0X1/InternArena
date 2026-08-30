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
 */
export const joinPartyByCode = async (userId, invitationCode) => {
    const response = await apiClient.post("/api/v1/partys/completeParty/newPlayer", null, {
        params: {
            user_id: userId,
            invitation_code: invitationCode
        }
    });
    return response.data;
};

/**
 * 1.5. Iniciar partida y generar problemas (completeParty)
 * POST /api/v1/partys/completeParty
 * Body: { party_id, difficulty, partyPrize, endTime }
 */
export const completeParty = async (partyData) => {
    const response = await apiClient.post("/api/v1/partys/completeParty", partyData);
    return response.data;
};

export default {
    createPartyDefault,
    getPartyById,
    getAllParties,
    joinPartyByCode,
    completeParty
};
