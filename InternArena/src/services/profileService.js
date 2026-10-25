import apiClient from "./api";
import { getUserById, getAllUsers } from "./userService";
import { getUserRecords } from "./recordService";
import { DEFAULT_EQUIPPED_COSMETICS, DIGITAL_COSMETICS } from "./inventoryService";
import profilebanner from "../assets/profilebanner.png";
import bannermatrix from "../assets/bannermatrix.jpg";
import joeswag from "../assets/joeswag.png";

export const MOCK_ACTIVITY_POSTS = [
    {
        id: "post-1",
        type: "match_recap",
        title: "Dominated Weekend Arena Contest #42",
        description: "Clutched 1st place solving 'LRU Cache' and 'Median of Two Sorted Arrays' in 18 minutes! Optimal O(log(min(n,m))) binary search approach paid off.",
        timestamp: "2 hours ago",
        matchId: 104,
        difficulty: "HARD",
        ranking: 1,
        leetcoinsWon: 250,
        problemsSolved: ["LRU Cache", "Median of Two Sorted Arrays"],
        likes: 24,
        comments: 6,
        media: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    },
    {
        id: "post-2",
        type: "achievement",
        title: "Unlocked 'Speedrun Ace' Mythic Badge!",
        description: "Achieved sub-5 minute accepted submission for dynamic programming matrix paths. Proud to equip this onto my public arena card.",
        timestamp: "Yesterday",
        matchId: 98,
        difficulty: "MEDIUM",
        ranking: 1,
        leetcoinsWon: 100,
        problemsSolved: ["Unique Paths II"],
        likes: 41,
        comments: 11,
        media: null,
    },
    {
        id: "post-3",
        type: "game_log",
        title: "Intense 1v1 Finals vs. AlgorithmPro",
        description: "Finished 2nd place in a nail-biting Graph Topological Sort showdown. Separated by only 14 seconds on the final testcase execution.",
        timestamp: "3 days ago",
        matchId: 92,
        difficulty: "HARD",
        ranking: 2,
        leetcoinsWon: 120,
        problemsSolved: ["Course Schedule II", "Alien Dictionary"],
        likes: 19,
        comments: 4,
        media: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    },
    {
        id: "post-4",
        type: "match_recap",
        title: "Clean Sweep in Daily Speed Lobby",
        description: "3 out of 3 problems solved on the first attempt with 0 runtime errors. Monotonic stack logic clicked instantly.",
        timestamp: "5 days ago",
        matchId: 85,
        difficulty: "MEDIUM",
        ranking: 1,
        leetcoinsWon: 150,
        problemsSolved: ["Daily Temperatures", "Next Greater Element II"],
        likes: 33,
        comments: 8,
        media: null,
    },
    {
        id: "post-5",
        type: "game_log",
        title: "Ladder Promotion to Grandmaster Tier",
        description: "Finally crossed the 2,400 ELO threshold on the competitive ranked ladder! Huge thanks to everyone practicing in my lobbies.",
        timestamp: "1 week ago",
        matchId: 78,
        difficulty: "HARD",
        ranking: 1,
        leetcoinsWon: 300,
        problemsSolved: ["Trapping Rain Water", "Sliding Window Maximum"],
        likes: 67,
        comments: 19,
        media: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80",
    },
    {
        id: "post-6",
        type: "match_recap",
        title: "Binary Tree Depth Search Challenge",
        description: "Fun weekend scrimmage focusing on tree recursions and level-order traversals. Placed 3rd out of 8 contestants.",
        timestamp: "2 weeks ago",
        matchId: 64,
        difficulty: "EASY",
        ranking: 3,
        leetcoinsWon: 50,
        problemsSolved: ["Binary Tree Right Side View"],
        likes: 15,
        comments: 2,
        media: null,
    },
];

/**
 * Fetches public user profile details including statistics and cosmetics.
 */
export const getPublicProfile = async (identifier) => {
    let userData = null;
    let userId = identifier;

    // Check if identifier is numeric ID or username
    const isNumeric = /^\d+$/.test(String(identifier));

    if (isNumeric) {
        try {
            userData = await getUserById(identifier);
        } catch (e) {
            console.warn("User lookup by ID failed, falling back to mock:", e);
        }
    } else {
        try {
            const allUsers = await getAllUsers();
            if (Array.isArray(allUsers)) {
                userData = allUsers.find(
                    (u) =>
                        u.username?.toLowerCase() === String(identifier).toLowerCase() ||
                        u.userEmail?.toLowerCase().startsWith(String(identifier).toLowerCase())
                );
                if (userData) {
                    userId = userData.user_id || userData.id;
                }
            }
        } catch (e) {
            console.warn("User lookup by username failed:", e);
        }
    }

    // Try fetching records
    let records = [];
    if (userId) {
        try {
            records = await getUserRecords(userId);
        } catch (e) {
            console.warn("Could not fetch user records:", e);
        }
    }

    // Check local storage for equipped cosmetics fallback
    let localCosmetics = DEFAULT_EQUIPPED_COSMETICS;
    try {
        const stored = localStorage.getItem("internarena_equipped_cosmetics");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.bannerId === "banner-matrix" || parsed.bannerUrl?.includes("526374965328")) {
                parsed.bannerUrl = bannermatrix;
            }
            localCosmetics = { ...DEFAULT_EQUIPPED_COSMETICS, ...parsed };
        }
    } catch {
        // Fallback
    }

    const winsCount = Array.isArray(records)
        ? records.filter((r) => String(r?.ranking) === "1").length
        : 14;

    const equippedBadgeObjs = DIGITAL_COSMETICS.filter(
        (c) => c.type === "badge" && localCosmetics.badgeIds?.includes(c.id)
    );

    return {
        userId: userId || 1,
        username: userData?.username || (isNumeric ? `Coder #${identifier}` : identifier) || "Flavio Gonsales",
        userEmail: userData?.userEmail || "coder@internarena.dev",
        avatarUrl: userData?.avatar_url || localCosmetics.avatarUrl || joeswag,
        bannerUrl: localCosmetics.bannerUrl || profilebanner,
        tagText: localCosmetics.tagText || "Algorithm Grandmaster",
        tagColor: localCosmetics.tagColor || "#f97316",
        badges: equippedBadgeObjs.length > 0 ? equippedBadgeObjs : [
            DIGITAL_COSMETICS.find((c) => c.id === "badge-contest-champion"),
            DIGITAL_COSMETICS.find((c) => c.id === "badge-speedrun"),
        ].filter(Boolean),
        leetcoins: Number(userData?.userLeetcoins) || 12450,
        matchWins: winsCount || 18,
        rankTier: "Grandmaster Tier",
        tierIcon: "👑",
        ladderRating: 2450,
        globalRank: "#1",
        winRate: "78.4%",
        recentStreak: ["W", "W", "W", "L", "W"],
        problemStats: {
            easy: 142,
            medium: 98,
            hard: 34,
            total: 274,
        },
        trophies: [
            { id: "gold-trophy", name: "Arena Season 1 Champion", icon: "🏆", tier: "Gold", count: 3 },
            { id: "silver-trophy", name: "Speed Coding Finalist", icon: "🥈", tier: "Silver", count: 7 },
            { id: "bronze-trophy", name: "Daily Scrimmage Cup", icon: "🥉", tier: "Bronze", count: 12 },
        ],
    };
};

/**
 * Returns paginated user activity posts, game recaps, and logs.
 */
export const getUserActivityPosts = async ({ page = 1, pageSize = 3 } = {}) => {
    const allPosts = MOCK_ACTIVITY_POSTS;
    const totalElements = allPosts.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const startIndex = (page - 1) * pageSize;
    const content = allPosts.slice(startIndex, startIndex + pageSize);

    return {
        content,
        page,
        pageSize,
        totalPages,
        totalElements,
    };
};
