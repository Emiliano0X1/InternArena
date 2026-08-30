import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeParty } from "../services/partyService";

export const useCreateMatch = (onSuccess, onError) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            return await completeParty(payload);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["party"] });
            queryClient.invalidateQueries({ queryKey: ["rankings"] });
            onSuccess?.(data);
        },
        onError: (err) => {
            onError?.(err);
        },
    });
};