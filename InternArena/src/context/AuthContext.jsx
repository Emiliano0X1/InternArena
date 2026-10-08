import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { supabase } from "../services/supabaseClient";
import { signOut as authSignOut } from "../services/authService";

const AuthContext = createContext({
	session: null,
	user: null,
	isAuthenticated: false,
	isLoading: true,
	signOut: async () => {},
});

export function AuthProvider({ children }) {
	const [session, setSession] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// 1. Initial active session fetch
		supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
			setSession(initialSession);
			setIsLoading(false);
		}).catch((err) => {
			console.error("Failed to restore Supabase auth session:", err);
			setIsLoading(false);
		});

		// 2. Real-time auth state changes listener
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, currentSession) => {
			setSession(currentSession);
			setIsLoading(false);
		});

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	const handleSignOut = async () => {
		try {
			await authSignOut();
			setSession(null);
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	const value = useMemo(
		() => ({
			session,
			user: session?.user || null,
			isAuthenticated: Boolean(session?.user),
			isLoading,
			signOut: handleSignOut,
		}),
		[session, isLoading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export default AuthContext;
