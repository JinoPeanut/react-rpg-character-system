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

        hpFormula: (level, job, stats) => job.baseHp + ((level - 1) * job.hpPerLevel),
        attackFormula: (stats) =>
            (stats.Str * 0.1) + (stats.Dex * 0.1) + (stats.Luk * 0.1),
        magicFormula: (stats) =>
            (stats.Int * 0.2) + (stats.Luk * 0.1),
    },

    warrior: {
        name: "전사",
        requirement: {
            Str: 20,
        },
        requireLevel: 10,
        baseHp: 100,
        hpPerLevel: 20,

        hpFormula: (level, job, stats) =>
            job.baseHp + ((level - 1) * job.hpPerLevel) + (stats.Str * 2),

        attackFormula: (stats) =>
            (stats.Str * 0.25) + (stats.Dex * 0.1),

        magicFormula: () => 0,
    },

    archer: {
        name: "궁수",
        requirement: {
            Dex: 20,
        },
        requireLevel: 10,
        attackFormula: (stats) =>
            (stats.Str * 0.1) + (stats.Dex * 0.25),
        magicFormula: () => 0,
    },

    mage: {
        name: "마법사",
        requirement: {
            Int: 20,
        },
        requireLevel: 10,
        attackFormula: () => 0,
        magicFormula: (stats) =>
            (stats.Int * 0.25) + (stats.Luk * 0.1),
    },

    thief: {
        name: "도적",
        requirement: {
            Luk: 20,
        },
        requireLevel: 10,
        attackFormula: (stats) =>
            (stats.Dex * 0.1) + (stats.Luk * 0.25),
        magicFormula: () => 0,
    },
};