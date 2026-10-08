import { useAuth } from "../context/AuthContext";

/**
 * Hook to access authentication context.
 * Returns { session, user, isAuthenticated, isLoading, signOut }
 */
export default useAuth;
export { useAuth };
