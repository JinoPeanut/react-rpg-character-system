import type { JobType } from "./jobs";

export type EquipmentSlot = "weapon" | "armorTop" | "armorBottom";

export type Equipment = {
    readonly name: string, // 장비 이름
    readonly attack?: number, // 공격력 증가량
    readonly magic?: number, // 마력 증가량
    readonly defense?: number, // 방어력 증가량
    readonly hp?: number, // 체력 증가량
    readonly allowedJobs?: readonly JobType[], // 장착가능 직업
    readonly slot: EquipmentSlot, // 장착 슬롯 칸
}

export const EQUIPMENTS = {
    weapon: {
        woodenSword: {
            name: "나무 검",
            attack: 3,
            allowedJobs: ["warrior"],
            slot: "weapon",
        },

        woodenStaff: {
            name: "나무 스태프",
            magic: 3,
            allowedJobs: ["mage"],
            slot: "weapon",
        },

        woodenBow: {
            name: "나무 활",
            attack: 3,
            allowedJobs: ["archer"],
            slot: "weapon",
        },

        woodenDagger: {
            name: "나무 단검",
            attack: 3,
            allowedJobs: ["thief"],
            slot: "weapon",
        },
    },

    armor: {
        clothTop: {
            name: "천 상의",
            hp: 10,
            defense: 2,
            slot: "armorTop",
        },

        clothBottom: {
            name: "천 하의",
            hp: 10,
            defense: 2,
            slot: "armorBottom",
        }
    }
    // as const 는 읽기전용 => 일관성을 위해 타입에 readonly 추가
    // satisfies 로 인해 타입정확성이 올라서 대부분 weapon armor 호출하는 부분에
    // as Equipment 로 타입을 확정해줘야함
} as const satisfies {
    weapon: Record<string, Equipment>,
    armor: Record<string, Equipment>
}

export type WeaponId = keyof typeof EQUIPMENTS.weapon;
export type ArmorId = keyof typeof EQUIPMENTS.armor;