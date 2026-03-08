import { create } from "zustand";
import { JOBS } from "../../../data/jobs";
import { canChangeJob } from "../utils/canChangeJob";

const defaultJob = "adventure";

export const useCharacterStore = create((set) => ({
    level: 1,

    job: defaultJob,

    // 캐릭터 총합 능력치
    stats: { ...JOBS[defaultJob].baseStats },

    // 모험가 기본 능력치
    baseStats: { ...JOBS[defaultJob].baseStats },

    levelUp: () => {
        set((state) => ({
            level: state.level + 1,
            remainingPoints: state.remainingPoints + 5,
        }))
    },

    changeJob: (jobKey) => set((state) => {
        const state = get();
        return canChangeJob(jobKey, state.stats, state.level);
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