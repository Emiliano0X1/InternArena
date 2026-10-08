import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../services/authService";
import { registerUserProfile } from "../services/userService";

/**
 * Custom hook orchestrating Supabase auth registration and backend profile linking.
 * @param {Function} onSuccess - Callback invoked on successful registration.
 * @param {Function} onError - Callback invoked when an error occurs.
 */
export const useRegister = (onSuccess, onError) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ email, password, username }) => {
			// 1. Create auth user in Supabase
			const authData = await signUp(email, password);

			// 2. Link user profile in the Spring Boot backend
			const profileData = await registerUserProfile({
				username: username.trim(),
				email: email.trim(),
			});

			return { authData, profileData };
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
			queryClient.invalidateQueries({ queryKey: ["users"] });
			onSuccess?.(data);
		},
		onError: (err) => {
			onError?.(err);
		},
	});
};
