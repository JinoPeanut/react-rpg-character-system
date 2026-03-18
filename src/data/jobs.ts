import type { Stats } from "../types/stats.js";

export type Job = {
    name: string,
    requireLevel?: number,
    requirement?: Partial<Stats>,
    baseHp: number,
    baseMp: number,
    hpPerLevel: number,
    mpPerLevel: number,
    baseCritChance: number,
    hpFormula: (level: number, job: Job, stats: Stats) => number,
    mpFormula: (level: number, job: Job, stats: Stats) => number,
    attackFormula: (stat: Stats) => number,
    magicFormula: (stat: Stats) => number,
    defenseFormula: (stat: Stats) => number,
}

/* 기본 크리티컬 데미지 2배 */

export const BASE_CRIT_DAMAGE = 2;

export const JOBS: Record<string, Job> = {

    adventure: {
        name: "모험가",
        baseHp: 10,
        baseMp: 10,
        hpPerLevel: 10,
        mpPerLevel: 1,
        baseCritChance: 0.1,

        hpFormula: (level: number, job: Job, stats: Stats) => job.baseHp + ((level - 1) * job.hpPerLevel),

        mpFormula: (level: number, job: Job, stats: Stats) => job.baseMp + ((level - 1) * job.mpPerLevel),

        attackFormula: (stats: Stats) => {
            return (stats.Str * 0.1) + (stats.Dex * 0.1) + (stats.Luk * 0.1)
        },

        magicFormula: (stats: Stats) => {
            return (stats.Int * 0.2) + (stats.Luk * 0.1)
        },

        defenseFormula: (stats: Stats) => {
            return (stats.Str * 0.05) + (stats.Dex * 0.05) + (stats.Int * 0.05) + (stats.Luk * 0.05)
        },
    },

    warrior: {
        name: "전사",
        requirement: {
            Str: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        baseMp: 100,
        hpPerLevel: 20,
        mpPerLevel: 5,
        baseCritChance: 0.2,

        hpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Str * 2)
        },

        mpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseMp + ((level - 1) * job.mpPerLevel) + (stats.Str * 0.5)
        },


        attackFormula: (stats: Stats) => {
            return (stats.Str * 0.25) + (stats.Dex * 0.1)
        },

        magicFormula: () => { return 0 },

        defenseFormula: (stats: Stats) => {
            return (stats.Str * 0.25) + (stats.Dex * 0.05)
        },
    },

    archer: {
        name: "궁수",
        requirement: {
            Dex: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        baseMp: 100,
        hpPerLevel: 15,
        mpPerLevel: 10,
        baseCritChance: 0.35,

        hpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Dex * 1.7)
        },

        mpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseMp + ((level - 1) * job.mpPerLevel) + (stats.Dex * 1)
        },

        attackFormula: (stats: Stats) => {
            return (stats.Dex * 0.2) + (stats.Str * 0.1)
        },

        magicFormula: () => { return 0 },

        defenseFormula: (stats: Stats) => {
            return (stats.Dex * 0.2) + (stats.Str * 0.05)
        },
    },

    mage: {
        name: "마법사",
        requirement: {
            Int: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        baseMp: 200,
        hpPerLevel: 10,
        mpPerLevel: 30,
        baseCritChance: 0.2,

        hpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Int * 1)
        },

        mpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseMp + ((level - 1) * job.mpPerLevel) + (stats.Int * 2)
        },

        attackFormula: () => { return 0 },

        magicFormula: (stats: Stats) => {
            return (stats.Int * 0.3) + (stats.Luk * 0.1)
        },

        defenseFormula: (stats: Stats) => {
            return (stats.Int * 0.1) + (stats.Luk * 0.05)
        },
    },

    thief: {
        name: "도적",
        requirement: {
            Luk: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        baseMp: 100,
        hpPerLevel: 13,
        mpPerLevel: 12,
        baseCritChance: 0.3,

        hpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Luk * 1.5)
        },

        mpFormula: (level: number, job: Job, stats: Stats) => {
            return job.baseMp + ((level - 1) * job.mpPerLevel) + (stats.Luk * 1.5)
        },

        attackFormula: (stats: Stats) => {
            return (stats.Luk * 0.2) + (stats.Dex * 0.1)
        },

        magicFormula: () => { return 0 },

        defenseFormula: (stats: Stats) => {
            return (stats.Luk * 0.2) + (stats.Dex * 0.05)
        },
    },
};

export type JobType = keyof typeof JOBS