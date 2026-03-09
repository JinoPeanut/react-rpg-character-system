import { create } from "zustand";
import { JOBS } from "../../../data/jobs";
import { canChangeJob } from "../utils/canChangeJob";

const defaultJob = "adventure";
const POINT_PER_LEVEL = 5;

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
            remainingPoints: state.remainingPoints + POINT_PER_LEVEL,
        }))
    },

    statReset: () => {
        set((state) => ({
            job: defaultJob,
            stats: { ...state.baseStats },
            remainingPoints: (state.level - 1) * POINT_PER_LEVEL,
        }))
    },

    changeJob: (jobKey) => set((state) => {
        if (!canChangeJob(jobKey, state.stats, state.level)) {
            return state;
        }

        return {
            job: jobKey,
        }
    }),

    // 남은 캐릭터 스탯
    remainingPoints: 0,

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