import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMatch = (onSuccess, onError) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/match`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error("Failed to create match");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rankings"] });
            onSuccess?.();
        },
        onError: () => {
            onError?.();
        },
    });
};