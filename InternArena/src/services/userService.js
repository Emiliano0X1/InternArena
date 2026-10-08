import apiClient from "./api";

/**
 * Verifies whether a LeetCode username is valid and available for linking.
 * @param {string} username
 * @returns {Promise<any>}
 */
export const checkLeetcodeUsername = async (username) => {
	const response = await apiClient.get("/api/v1/users/check", {
		params: { username },
		skipAuth: true,
	});
	return response.data;
};

/**
 * Registers a new user profile linked to the authenticated JWT identity.
 * @param {Object} userData - e.g. { username, email, ... }
 * @returns {Promise<any>}
 */
export const registerUserProfile = async (userData) => {
	const response = await apiClient.post("/api/v1/users/register", userData);
	return response.data;
};

/**
 * Fetches the full user entity for the currently authenticated user.
 * @returns {Promise<any>}
 */
export const getCurrentUser = async () => {
	const response = await apiClient.get("/api/v1/users/me");
	return response.data;
};

/**
 * Lists all registered users.
 * @returns {Promise<any>}
 */
export const getAllUsers = async () => {
	const response = await apiClient.get("/api/v1/users");
	return response.data;
};

/**
 * Retrieves a user's details by their UUID.
 * @param {string|number} id
 * @returns {Promise<any>}
 */
export const getUserById = async (id) => {
	const response = await apiClient.get(`/api/v1/users/${id}`);
	return response.data;
};

/**
 * Updates profile information for a user by UUID.
 * @param {string|number} id
 * @param {Object} userData
 * @returns {Promise<any>}
 */
export const updateUser = async (id, userData) => {
	const response = await apiClient.put(`/api/v1/users/${id}`, userData);
	return response.data;
};

/**
 * Deletes a user account by UUID.
 * @param {string|number} id
 * @returns {Promise<any>}
 */
export const deleteUser = async (id) => {
	const response = await apiClient.delete(`/api/v1/users/${id}`);
	return response.data;
};
