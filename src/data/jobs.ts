import type { Stats } from "../types/stats.js";

/* 기본 크리티컬 데미지 2배 */
export const BASE_CRIT_DAMAGE = 2;

export const JOBS = {

    adventure: {
        name: "모험가",
        baseStats: {
            Str: 8,
            Dex: 8,
            Int: 8,
            Luk: 8,
        },
        baseHp: 10,
        hpPerLevel: 10,
        baseCritChance: 0.1,

        hpFormula: (level: number, job: any, stats: Stats) => job.baseHp + ((level - 1) * job.hpPerLevel),

        attackFormula: (stats: Stats) =>
            (stats.Str * 0.1) + (stats.Dex * 0.1) + (stats.Luk * 0.1),

        magicFormula: (stats: Stats) =>
            (stats.Int * 0.2) + (stats.Luk * 0.1),

        defenseFormula: (stats: Stats) =>
            (stats.Str * 0.05) + (stats.Dex * 0.05) + (stats.Int * 0.05) + (stats.Luk * 0.05),


    },

    warrior: {
        name: "전사",
        requirement: {
            Str: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        hpPerLevel: 20,
        baseCritChance: 0.2,

        hpFormula: (level: number, job: any, stats: Stats) =>
            job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Str * 2),

        attackFormula: (stats: Stats) =>
            (stats.Str * 0.25) + (stats.Dex * 0.1),

        magicFormula: () => 0,

        defenseFormula: (stats: Stats) =>
            (stats.Str * 0.25) + (stats.Dex * 0.05),
    },

    archer: {
        name: "궁수",
        requirement: {
            Dex: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        hpPerLevel: 15,
        baseCritChance: 0.35,

        hpFormula: (level: number, job: any, stats: Stats) =>
            job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Dex * 1.7),

        attackFormula: (stats: Stats) =>
            (stats.Dex * 0.2) + (stats.Str * 0.1),

        magicFormula: () => 0,

        defenseFormula: (stats: Stats) =>
            (stats.Dex * 0.2) + (stats.Str * 0.05),
    },

    mage: {
        name: "마법사",
        requirement: {
            Int: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        hpPerLevel: 10,
        baseCritChance: 0.2,

        hpFormula: (level: number, job: any, stats: Stats) =>
            job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Int * 1),
        attackFormula: () => 0,

        magicFormula: (stats: Stats) =>
            (stats.Int * 0.3) + (stats.Luk * 0.1),

        defenseFormula: (stats: Stats) =>
            (stats.Int * 0.1) + (stats.Luk * 0.05),
    },

    thief: {
        name: "도적",
        requirement: {
            Luk: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        hpPerLevel: 13,
        baseCritChance: 0.3,

        hpFormula: (level: number, job: any, stats: Stats) =>
            job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Luk * 1.5),

        attackFormula: (stats: Stats) =>
            (stats.Luk * 0.2) + (stats.Dex * 0.1),

        magicFormula: () => 0,

        defenseFormula: (stats: Stats) =>
            (stats.Luk * 0.2) + (stats.Dex * 0.05),
    },
};

export type JobType = keyof typeof JOBS