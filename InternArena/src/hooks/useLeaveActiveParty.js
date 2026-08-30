import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveActiveParty } from "../services/partyService";
import { clearStoredPartySession } from "../utils/partyStorage";

/**
 * Custom hook for leaving an active match/party
 * Calls POST /api/v1/partys/{id}/leave?user_id={userId}
 */
export const useLeaveActiveParty = (onSuccess, onError) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ partyId, userId }) => {
            return await leaveActiveParty({ partyId, userId });
        },
        onSuccess: (data, variables) => {
            clearStoredPartySession();
            queryClient.invalidateQueries({ queryKey: ["party"] });
            queryClient.invalidateQueries({ queryKey: ["matchInfo"] });
            queryClient.invalidateQueries({ queryKey: ["activeMatches"] });
            queryClient.invalidateQueries({ queryKey: ["rankings"] });
            onSuccess?.(data, variables);
        },
        onError: (err, variables) => {
            // Still clear local session if desired or allow caller to handle
            clearStoredPartySession();
            onError?.(err, variables);
        },
    });
};

export default useLeaveActiveParty;
