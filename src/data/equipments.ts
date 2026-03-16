import type { JobType } from "./jobs.js";

export type EquipmentSlot = "weapon" | "armorTop" | "armorBottom";

type Equipment = {
    name: string,
    attack?: number,
    magic?: number,
    defense?: number,
    hp?: number,
    allowedJobs?: readonly JobType[],
    slot: EquipmentSlot,
}

export const EQUIPMENTS: {
    weapon: Record<string, Equipment>,
    armor: Record<string, Equipment>,
} = {
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
} as const

export type WeaponId = keyof typeof EQUIPMENTS.weapon;
export type ArmorId = keyof typeof EQUIPMENTS.armor;