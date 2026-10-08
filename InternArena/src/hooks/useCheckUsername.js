import { useQuery } from "@tanstack/react-query";
import { checkLeetcodeUsername } from "../services/userService";

/**
 * Custom hook to verify if a LeetCode username is valid and available.
 * @param {string} username - LeetCode username to check.
 * @param {Object} options - Additional options (e.g., enabled).
 */
export const useCheckUsername = (username, options = {}) => {
	const trimmedUsername = username?.trim() || "";
	const isLengthValid = trimmedUsername.length >= 2;

	return useQuery({
		queryKey: ["checkUsername", trimmedUsername],
		queryFn: async () => {
			if (!trimmedUsername) return null;
			return await checkLeetcodeUsername(trimmedUsername);
		},
		enabled: isLengthValid && (options.enabled ?? true),
		staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
		retry: false,
		refetchOnWindowFocus: false,
		...options,
	});
};
