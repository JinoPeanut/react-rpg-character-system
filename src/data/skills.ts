import type { JobType } from "./jobs";

export type Skill = {
    id: string,
    name: string,
    maxLevel: number | null,
    damage: number | null,
    damagePerLevel: number | null,
    cost: number | null,
    description: string | null,
}
export type SkillState = Partial<Record<string, Skill>>

export const SKILLS: Record<JobType, SkillState> = {
    adventure: {
        adventure_skill_1: {
            id: "adventure_skill_1",
            name: "돌 던지기",
            maxLevel: 10,
            damage: 100,
            damagePerLevel: 10,
            cost: 1,
            description: "이제 막 시작한 모험가가 사용할 수 있는 기본적인 스킬이다. 힘, 민첩, 지능, 행운을 더해서 전직하기 전 스탯의 활용을 배운다"
        },
    },

    warrior: {
        warrior_skill_1: {
            id: "warrior_skill_1",
            name: "연속 베기",
            maxLevel: 10,
            damage: 140,
            damagePerLevel: 20,
            cost: 5,
            description: "검을 활용해 적을 빠르게 두번 베어 가른다."
        },

        warrior_skill_2: {
            id: "warrior_skill_2",
            name: "",
            maxLevel: null,
            damage: null,
            damagePerLevel: null,
            cost: null,
            description: null,
        },
    },

    archer: {
        archer_skill_1: {
            id: "archer_skill_1",
            name: "더블 샷",
            maxLevel: 10,
            damage: 120,
            damagePerLevel: 20,
            cost: 7,
            description: "활을 이용해 다수의 적을 상대하기 좋은 공격이다."
        },
    },

    mage: {
        mage_skill_1: {
            id: "mage_skill_1",
            name: "화염구",
            maxLevel: 10,
            damage: 180,
            damagePerLevel: 20,
            cost: 10,
            description: "마법사의 가장 기초적인 마법이자 강력한 마법이다. 전방으로 화염구를 발사한다."
        },

    },

    thief: {
        thief_skill_1: {
            id: "thief_skill_1",
            name: "급습",
            maxLevel: 10,
            damage: 150,
            damagePerLevel: 20,
            cost: 10,
            description: "상대방이 알아차리기 전에 치명적인 공격을하는 기술이다"
        }
    },
}