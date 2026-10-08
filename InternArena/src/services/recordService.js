import apiClient from "./api";

/**
 * Retrieves match history records for a specific user.
 * @param {string|number} userId
 * @returns {Promise<Array>}
 */
export const getUserRecords = async (userId) => {
	if (!userId) return [];
	const response = await apiClient.get(`/api/v1/record/byuser/${userId}`);
	return response.data || [];
};

/**
 * Retrieves all match records across the platform.
 * @returns {Promise<Array>}
 */
export const getAllRecords = async () => {
	const response = await apiClient.get("/api/v1/record");
	return response.data || [];
};

/**
 * Creates a new match record.
 * @param {Object} recordData - { ranking, endTime, userId }
 * @returns {Promise<Object>}
 */
export const createRecord = async (recordData) => {
	const response = await apiClient.post("/api/v1/record/create", recordData);
	return response.data;
};
