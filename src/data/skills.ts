import type { JobType } from "./jobs";

export type Skill = {
    id: string,
    name: string,
    maxLevel: number | null,
    damage: number | null,
    damagePerLevel: number | null,
    cost: number | null,
}
export type SkillState = Partial<Record<string, Skill>>

export const SKILLS: Record<JobType, SkillState> = {
    adventure: {
        adventure_skill_1: {
            id: "adventure_skill_1",
            name: "돌 던지기",
            maxLevel: 10,
            damage: 100,
            damagePerLevel: 1,
            cost: 1,
        },
    },

    warrior: {
        warrior_skill_1: {
            id: "warrior_skill_1",
            name: "연속 베기",
            maxLevel: 10,
            damage: 140,
            damagePerLevel: 2,
            cost: 5,
        },

        warrior_skill_2: {
            id: "warrior_skill_2",
            name: "",
            maxLevel: null,
            damage: null,
            damagePerLevel: null,
            cost: null,
        },
    },

    archer: {
        archer_skill_1: {
            id: "archer_skill_1",
            name: "더블 샷",
            maxLevel: 10,
            damage: 120,
            damagePerLevel: 2,
            cost: 7,
        },
    },

    mage: {
        mage_skill_1: {
            id: "mage_skill_1",
            name: "화염구",
            maxLevel: 10,
            damage: 180,
            damagePerLevel: 2,
            cost: 10,
        },

    },

    thief: {
        thief_skill_1: {
            id: "thief_skill_1",
            name: "급습",
            maxLevel: 10,
            damage: 150,
            damagePerLevel: 2,
            cost: 10,
        }
    },
}