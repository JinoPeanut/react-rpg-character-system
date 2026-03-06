import { create } from "zustand";
import { JOBS } from "../../../data/jobs";

const defaultJob = "adventure";

export const useCharacterStore = create((set) => ({
    job: defaultJob,

    // 캐릭터 기본 능력치
    stats: { ...JOBS[defaultJob].baseStats },

    baseStats: { ...JOBS[defaultJob].baseStats },

    changeJob: (jobKey) => set((state) => {
        const requirement = JOBS[jobKey].requirement;

        if (!requirement) return state;

        const canChange = Object.entries(requirement).every(
            ([stat, value]) => state.stats[stat] >= value
        );

        if (!canChange) return state;

        return {
            job: jobKey,
        }
    }),

    // 남은 캐릭터 스탯
    remainingPoints: 20,

    // 캐릭터가 가진 스킬들
    skills: [],

    // 기본 장착 장비
    equipment: {
        weapon: null,
        armor: null,
    },

    increaseStat: (stat) => set((state) => {
        if (state.remainingPoints <= 0) return state;

        return {
            stats: {
                ...state.stats,
                [stat]: state.stats[stat] + 1,
            },
            remainingPoints: state.remainingPoints - 1,
        }
    }),

    decreaseStat: (stat) => set((state) => {
        if (state.stats[stat] <= state.baseStats[stat]) return state;

        return {
            stats: {
                ...state.stats,
                [stat]: state.stats[stat] - 1,
            },
            remainingPoints: state.remainingPoints + 1,
        }
    }),
}));