import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/userService";
import { getUserRecords } from "../services/recordService";
import { useAuth } from "../context/AuthContext";

/**
 * Custom hook to fetch current authenticated user profile and stats.
 * Includes safe default values and error-resilient fallbacks.
 */
export const useCurrentUser = () => {
	const { session, isAuthenticated, isLoading: isAuthLoading } = useAuth();

	const query = useQuery({
		queryKey: ["currentUser", session?.user?.id],
		queryFn: async () => {
			try {
				const userProfile = await getCurrentUser();
				const userId = userProfile?.user_id || userProfile?.id;

				let matchWins = 0;
				if (userId) {
					try {
						const records = await getUserRecords(userId);
						if (Array.isArray(records)) {
							matchWins = records.filter(
								(r) => String(r?.ranking) === "1"
							).length;
						}
					} catch (recordsErr) {
						console.warn("Could not fetch user records:", recordsErr);
					}
				}

				return {
					...userProfile,
					computedWins: matchWins,
				};
			} catch (err) {
				console.warn("Could not fetch profile from /api/v1/users/me:", err);
				// Fallback to Supabase session metadata if backend request fails
				return {
					username:
						session?.user?.user_metadata?.username ||
						session?.user?.email?.split("@")[0] ||
						"User Day One",
					userEmail: session?.user?.email || "",
					userLeetcoins: 0,
					computedWins: 0,
				};
			}
		},
		enabled: isAuthenticated && Boolean(session?.user?.id),
		staleTime: 1000 * 60 * 2, // 2 minutes cache
		refetchOnWindowFocus: true,
	});

	// Safe edge-case defaults as requested
	const profile = {
		username:
			query.data?.username ||
			session?.user?.user_metadata?.username ||
			"User Day One",
		profileImg:
			query.data?.profileImg ||
			query.data?.avatar_url ||
			session?.user?.user_metadata?.avatar_url ||
			null,
		leetcoins:
			Number(query.data?.userLeetcoins ?? query.data?.leetcoins) || 0,
		matchWins:
			Number(query.data?.computedWins ?? query.data?.matchWins) || 0,
		userEmail: query.data?.userEmail || session?.user?.email || "",
		userId: query.data?.user_id || query.data?.id || null,
		raw: query.data || null,
	};

	return {
		...query,
		profile,
		isAuthenticated,
		isAuthLoading,
	};
};

export default useCurrentUser;
