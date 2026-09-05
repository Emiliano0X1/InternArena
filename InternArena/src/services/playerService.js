import apiClient from "./api";

/**
 * Player Service - API integration based on endpoints_reference.md
 */

/**
 * 3.1. Listar jugadores
 * GET /api/v1/players
 */
export const getAllPlayers = async () => {
    const response = await apiClient.get("/api/v1/players");
    return response.data;
};

/**
 * 3.2. Obtener jugador por ID
 * GET /api/v1/players/{id}
 * 
 * @param {number|string} playerId
 */
export const getPlayerById = async (playerId) => {
    const response = await apiClient.get(`/api/v1/players/${playerId}`);
    return response.data;
};

/**
 * 3.3. Obtener jugadores por ID de Usuario
 * GET /api/v1/players/byuser/{userId}
 * 
 * @param {number|string} userId
 */
export const getPlayersByUserId = async (userId) => {
    const response = await apiClient.get(`/api/v1/players/byuser/${userId}`);
    return response.data;
};

/**
 * 3.4. Crear jugador
 * POST /api/v1/players/create
 * Body: { playerUsername, userId }
 */
export const createPlayer = async (playerData) => {
    const response = await apiClient.post("/api/v1/players/create", playerData);
    return response.data;
};

/**
 * 3.5. Actualizar estadísticas de jugador
 * PUT /api/v1/players/{id}
 */
export const updatePlayer = async (playerId, playerData) => {
    const response = await apiClient.put(`/api/v1/players/${playerId}`, playerData);
    return response.data;
};

/**
 * 3.6. Eliminar jugador / Salir de una sala como jugador (Leave Party)
 * DELETE /api/v1/players/{id}
 * 
 * @param {number|string} playerId
 * @returns {Promise<void>}
 */
export const deletePlayer = async (playerId) => {
    const response = await apiClient.delete(`/api/v1/players/${playerId}`);
    return response.data;
};

export default {
    getAllPlayers,
    getPlayerById,
    getPlayersByUserId,
    createPlayer,
    updatePlayer,
    deletePlayer,
};
