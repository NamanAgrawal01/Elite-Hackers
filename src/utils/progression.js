/**
 * ELITE HACKERS - LEVEL SYSTEM
 * Logic: xp = 500 * (level - 1)^2 + 500 * (level - 1)
 * This creates a quadratic scaling curve.
 */

export const getXPForLevel = (level) => {
    if (level <= 1) return 0;
    // Simplified: 500 * (level-1) * (level) / 2 ? No, let's stick to the context logic
    // xp = [(1000 * (level - 1) + 500)^2 - 250000] / 2000
    return (Math.pow(1000 * (level - 1) + 500, 2) - 250000) / 2000;
};

export const getLevelForXP = (xp) => {
    if (xp <= 0) return 1;
    return Math.floor((-500 + Math.sqrt(250000 + 2000 * xp)) / 1000) + 1;
};

export const getRankForLevel = (level) => {
    if (level < 5) return "Script Kiddie";
    if (level < 10) return "Code Monkey";
    if (level < 20) return "Junior Hacker";
    if (level < 35) return "Senior Architect";
    if (level < 50) return "Cyber Ninja";
    if (level < 75) return "Elite Sentinel";
    return "Elite Hackers God";
};
