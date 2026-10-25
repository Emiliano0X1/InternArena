import { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getEquippedCosmetics,
    saveEquippedCosmetics,
    DIGITAL_COSMETICS,
    REAL_LIFE_REDEEMABLES,
} from "../services/inventoryService";
import useCurrentUser from "./useCurrentUser";

export const useInventory = () => {
    const queryClient = useQueryClient();
    const { profile } = useCurrentUser();
    const userId = profile?.userId;

    const [equipped, setEquipped] = useState(() => getEquippedCosmetics());
    const [draft, setDraft] = useState(() => getEquippedCosmetics());

    // Check if there are unsaved preview changes
    const hasUnsavedChanges = useMemo(() => {
        return (
            draft.bannerId !== equipped.bannerId ||
            draft.tagId !== equipped.tagId ||
            draft.avatarId !== equipped.avatarId ||
            JSON.stringify(draft.badgeIds.sort()) !== JSON.stringify(equipped.badgeIds.sort())
        );
    }, [draft, equipped]);

    // Real-time preview equip toggle
    const equipItem = useCallback((item) => {
        if (!item || !item.type) return;

        setDraft((prev) => {
            if (item.type === "banner") {
                return {
                    ...prev,
                    bannerId: item.id,
                    bannerUrl: item.image,
                };
            }
            if (item.type === "tag") {
                return {
                    ...prev,
                    tagId: item.id,
                    tagText: item.tagText,
                    tagColor: item.tagColor,
                };
            }
            if (item.type === "badge") {
                const currentBadges = prev.badgeIds || [];
                const isEquipped = currentBadges.includes(item.id);
                // Allow maximum 3 badges simultaneously
                if (isEquipped) {
                    return {
                        ...prev,
                        badgeIds: currentBadges.filter((b) => b !== item.id),
                    };
                } else {
                    const updated = [...currentBadges, item.id];
                    // Keep up to 3 badges
                    if (updated.length > 3) updated.shift();
                    return {
                        ...prev,
                        badgeIds: updated,
                    };
                }
            }
            if (item.type === "avatar") {
                return {
                    ...prev,
                    avatarId: item.id,
                    avatarUrl: item.image,
                };
            }
            return prev;
        });
    }, []);

    const resetPreview = useCallback(() => {
        setDraft(equipped);
    }, [equipped]);

    // Save changes mutation
    const saveMutation = useMutation({
        mutationFn: async (cosmeticsToSave) => {
            return await saveEquippedCosmetics(userId, cosmeticsToSave);
        },
        onSuccess: (savedCosmetics) => {
            setEquipped(savedCosmetics);
            setDraft(savedCosmetics);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            queryClient.invalidateQueries({ queryKey: ["inventory"] });
        },
    });

    const handleSaveChanges = useCallback(() => {
        return saveMutation.mutateAsync(draft);
    }, [draft, saveMutation]);

    return {
        equipped,
        draft,
        hasUnsavedChanges,
        equipItem,
        resetPreview,
        saveChanges: handleSaveChanges,
        isSaving: saveMutation.isPending,
        saveError: saveMutation.error,
        digitalCosmetics: DIGITAL_COSMETICS,
        redeemableItems: REAL_LIFE_REDEEMABLES,
        profile,
    };
};

export default useInventory;
