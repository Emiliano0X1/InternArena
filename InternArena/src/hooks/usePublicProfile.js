import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicProfile, getUserActivityPosts } from "../services/profileService";

export const usePublicProfile = (identifier = "1") => {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    // Fetch user public profile data and stats
    const profileQuery = useQuery({
        queryKey: ["publicProfile", identifier],
        queryFn: () => getPublicProfile(identifier),
        staleTime: 1000 * 60 * 3, // 3 minutes
    });

    // Fetch paginated match activity posts
    const activityQuery = useQuery({
        queryKey: ["userActivityPosts", identifier, page],
        queryFn: () => getUserActivityPosts({ page, pageSize }),
        staleTime: 1000 * 60 * 3,
    });

    const handleNextPage = () => {
        if (activityQuery.data && page < activityQuery.data.totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return {
        profile: profileQuery.data,
        isLoadingProfile: profileQuery.isLoading,
        profileError: profileQuery.error,

        activityData: activityQuery.data,
        isLoadingActivity: activityQuery.isLoading,
        activityError: activityQuery.error,

        page,
        setPage,
        nextPage: handleNextPage,
        prevPage: handlePrevPage,
        totalPages: activityQuery.data?.totalPages || 1,
        totalElements: activityQuery.data?.totalElements || 0,
    };
};

export default usePublicProfile;
