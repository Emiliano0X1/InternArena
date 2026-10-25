import apiClient from "./api";
import { updateUser } from "./userService";
import profilebanner from "../assets/profilebanner.png";
import bannermatrix from "../assets/bannermatrix.jpg";
import joeswag from "../assets/joeswag.png";

export const DEFAULT_EQUIPPED_COSMETICS = {
    bannerId: "banner-classic",
    bannerUrl: profilebanner,
    tagId: "tag-speed-demon",
    tagText: "Speed Demon [O(1)]",
    tagColor: "#f97316",
    badgeIds: ["badge-contest-champion", "badge-speedrun"],
    avatarId: "avatar-default",
    avatarUrl: joeswag,
};

export const DIGITAL_COSMETICS = [
    // BANNERS
    {
        id: "banner-classic",
        type: "banner",
        name: "Classic Arena",
        description: "The classic dark arena battlefield banner.",
        image: profilebanner,
        previewGradient: "linear-gradient(135deg, #2b2525 0%, #171515 100%)",
        rarity: "Common",
        rarityColor: "#9ca3af",
    },
    {
        id: "banner-inferno",
        type: "banner",
        name: "Inferno Blaze",
        description: "Fiery orange embers forged in competitive contests.",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&h=450&q=85",
        previewGradient: "linear-gradient(135deg, #ea580c 0%, #7c2d12 50%, #1c1917 100%)",
        rarity: "Mythic",
        rarityColor: "#f97316",
    },
    {
        id: "banner-cyberpunk",
        type: "banner",
        name: "Cyber Neon Grid",
        description: "Luminescent violet and cyan synthwave grid.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&h=450&q=85",
        previewGradient: "linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #09090b 100%)",
        rarity: "Legendary",
        rarityColor: "#a855f7",
    },
    {
        id: "banner-matrix",
        type: "banner",
        name: "Terminal Matrix",
        description: "Cascading digital green code streams.",
        image: bannermatrix,
        previewGradient: "linear-gradient(135deg, #059669 0%, #064e3b 50%, #022c22 100%)",
        rarity: "Rare",
        rarityColor: "#10b981",
    },
    {
        id: "banner-void",
        type: "banner",
        name: "Golden Obsidian",
        description: "Polished obsidian glass laced with radiant gold filaments.",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&h=450&q=85",
        previewGradient: "linear-gradient(135deg, #eab308 0%, #854d0e 50%, #18181b 100%)",
        rarity: "Legendary",
        rarityColor: "#eab308",
    },

    // TAGS / TITLES
    {
        id: "tag-grandmaster",
        type: "tag",
        name: "Algorithm Grandmaster",
        description: "Awarded to masters of dynamic programming and graphs.",
        tagText: "Algorithm Grandmaster",
        tagColor: "#f59e0b",
        rarity: "Mythic",
        rarityColor: "#f59e0b",
    },
    {
        id: "tag-speed-demon",
        type: "tag",
        name: "Speed Demon [O(1)]",
        description: "Solving problems at constant time complexity.",
        tagText: "Speed Demon [O(1)]",
        tagColor: "#f97316",
        rarity: "Legendary",
        rarityColor: "#f97316",
    },
    {
        id: "tag-binary-wizard",
        type: "tag",
        name: "Binary Wizard",
        description: "Divides and conquers every edge case with ease.",
        tagText: "Binary Wizard",
        tagColor: "#a855f7",
        rarity: "Rare",
        rarityColor: "#a855f7",
    },
    {
        id: "tag-bug-hunter",
        type: "tag",
        name: "Zero-Bug Architect",
        description: "Accepted on the first attempt without runtime errors.",
        tagText: "Zero-Bug Architect",
        tagColor: "#10b981",
        rarity: "Rare",
        rarityColor: "#10b981",
    },
    {
        id: "tag-recursion-guru",
        type: "tag",
        name: "Recursion Guru",
        description: "To understand recursion, you must first understand recursion.",
        tagText: "Recursion Guru",
        tagColor: "#06b6d4",
        rarity: "Common",
        rarityColor: "#06b6d4",
    },

    // BADGES
    {
        id: "badge-contest-champion",
        type: "badge",
        name: "Contest Champion",
        iconName: "FaTrophy",
        badgeColor: "#f59e0b",
        description: "Finished 1st place in an Arena lobby.",
        rarity: "Mythic",
        rarityColor: "#f59e0b",
    },
    {
        id: "badge-speedrun",
        type: "badge",
        name: "Speedrun Ace",
        iconName: "FaBolt",
        badgeColor: "#f97316",
        description: "Submitted clean solution within 5 minutes.",
        rarity: "Legendary",
        rarityColor: "#f97316",
    },
    {
        id: "badge-clean-code",
        type: "badge",
        name: "Clean Architecture",
        iconName: "FaGem",
        badgeColor: "#a855f7",
        description: "Top 99.9% runtime and memory efficiency.",
        rarity: "Rare",
        rarityColor: "#a855f7",
    },
    {
        id: "badge-century-solver",
        type: "badge",
        name: "LeetCode 100",
        iconName: "FaMedal",
        badgeColor: "#10b981",
        description: "100 problems conquered in Arena practices.",
        rarity: "Rare",
        rarityColor: "#10b981",
    },
    {
        id: "badge-crown",
        type: "badge",
        name: "Arena Royalty",
        iconName: "FaCrown",
        badgeColor: "#ec4899",
        description: "Exclusive top tier cosmetic badge.",
        rarity: "Mythic",
        rarityColor: "#ec4899",
    },
];

export const REAL_LIFE_REDEEMABLES = [
    {
        id: "redeem-hoodie-01",
        name: "LeetArena Premium Heavyweight Hoodie",
        category: "Apparel",
        description: "400 GSM ultra-soft organic cotton with embroidered neon orange logo and custom sleeve patch.",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
        status: "PROCESSING", // "READY_TO_CLAIM" | "PROCESSING" | "SHIPPED" | "CLAIMED"
        claimCode: "HOODIE-ARENA-9941X",
        claimedDate: "2026-10-18",
        shippingAddress: "Av. Insurgentes Sur 1450, CDMX, Mexico",
        trackingNumber: "FEDEX-8849204820",
    },
    {
        id: "redeem-keycap-02",
        name: "Gold-Plated Artisan Cherry MX Keycap",
        category: "Hardware / Peripherals",
        description: "Solid zinc-alloy artisan keycap with laser engraved LeetCode bracket emblem for mechanical keyboards.",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
        status: "SHIPPED",
        claimCode: "KEYCAP-GOLD-4412A",
        claimedDate: "2026-10-12",
        shippingAddress: "Av. Insurgentes Sur 1450, CDMX, Mexico",
        trackingNumber: "DHL-EXPRESS-9921049",
    },
    {
        id: "redeem-voucher-03",
        name: "LeetCode Premium 1-Year Subscription Card",
        category: "Digital Voucher",
        description: "Official digital activation code granting 12 months of full access to company problem sets & mock interviews.",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
        status: "READY_TO_CLAIM",
        claimCode: "LC-PREM-2026-8874-XK9",
        claimedDate: "2026-10-24",
        expiryDate: "2027-10-24",
    },
    {
        id: "redeem-stickers-04",
        name: "Holographic Vinyl Dev Stickers Pack (x10)",
        category: "Merchandise",
        description: "Waterproof, UV-resistant die-cut vinyl stickers featuring custom LeetArena and algorithm humor artwork.",
        image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=600&auto=format&fit=crop&q=80",
        status: "CLAIMED",
        claimCode: "STICKERS-HOLO-3318",
        claimedDate: "2026-09-30",
        shippingAddress: "Av. Insurgentes Sur 1450, CDMX, Mexico",
        trackingNumber: "MEXPOST-MX-0019284",
    },
];

const STORAGE_KEY = "internarena_equipped_cosmetics";

export const getEquippedCosmetics = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.bannerId === "banner-matrix" || parsed.bannerUrl?.includes("526374965328")) {
                parsed.bannerUrl = bannermatrix;
            }
            return { ...DEFAULT_EQUIPPED_COSMETICS, ...parsed };
        }
    } catch (e) {
        console.warn("Failed to load cosmetics from local storage:", e);
    }
    return DEFAULT_EQUIPPED_COSMETICS;
};

export const saveEquippedCosmetics = async (userId, cosmetics) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cosmetics));
    } catch (e) {
        console.warn("Failed to write cosmetics to storage:", e);
    }

    if (userId) {
        try {
            await updateUser(userId, {
                equippedCosmetics: JSON.stringify(cosmetics),
            });
        } catch (err) {
            console.warn("Backend profile sync optional notice:", err?.message || err);
        }
    }

    return cosmetics;
};
