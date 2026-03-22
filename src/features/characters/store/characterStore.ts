import { create } from "zustand";
import { EQUIPMENTS } from "../../../data/equipments";
import { JOBS } from "../../../data/jobs";
import { canChangeJob } from "../utils/canChangeJob";

import type { Stats } from "../../../types/stats";
import type { JobType } from "../../../data/jobs";
import type { WeaponId, ArmorId } from "../../../data/equipments";

type EquipmentSlot = "weapon" | "armorTop" | "armorBottom";

export type EquippedItems = {
    weapon: WeaponId | null,
    armorTop: ArmorId | null,
    armorBottom: ArmorId | null,
}

type CharacterState = {
    level: number,
    job: JobType;

    stats: Stats;
    baseStats: Stats;

    remainingPoints: number,

    skills: string[],

    // 인벤토리 관련
    inventory: string[],
    addItem: (itemId: string) => void,
    removeItem: (itemId: string) => void,
    equipFromInventory: (itemId: string) => void,

    equippedItems: EquippedItems,

    levelUp: () => void;
    statReset: () => void;

    changeJob: (jobKey: JobType) => void;

    equipItem: (itemId: WeaponId | ArmorId) => void;
    unEquipItem: (slot: EquipmentSlot) => void;

    increaseStat: (stat: keyof Stats) => void;
    decreaseStat: (stat: keyof Stats) => void;
}

const defaultJob: JobType = "adventure";
const POINT_PER_LEVEL = 5;
const DEFAULT_STATS: Stats = {
    Str: 8,
    Dex: 8,
    Int: 8,
    Luk: 8,
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
    level: 1,

    job: defaultJob,

    // 캐릭터 총합 능력치
    stats: { ...DEFAULT_STATS },

    // 모험가 기본 능력치
    baseStats: { ...DEFAULT_STATS },

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

    inventory: [
        "woodenSword", "clothTop",
        "clothBottom", "woodenStaff",
        "woodenDagger", "woodenBow"
    ],

    addItem: (itemId) => set((state) => ({
        inventory: [...state.inventory, itemId]
    })),

    removeItem: (itemId) => set((state) => ({
        inventory: state.inventory.filter((id) => id !== itemId)
    })),

    equipFromInventory: (itemId) => set((state) => {
        state.equipItem(itemId);

        return {
            inventory: state.inventory.filter((id) => id !== itemId),
        }
    }),

    // 기본 장착 장비
    equippedItems: {
        weapon: null,
        armorTop: null,
        armorBottom: null,
    },

    //장비 장착 함수
    equipItem: (itemId: WeaponId | ArmorId) => {
        const job = get().job;
        let item;

        if (itemId in EQUIPMENTS.weapon) {
            item = EQUIPMENTS.weapon[itemId as WeaponId];
        } else {
            item = EQUIPMENTS.armor[itemId as ArmorId];
        }

        if (!item) return;

        if (item.allowedJobs && !item.allowedJobs.includes(job)) {
            console.log("이 직업은 장착할 수 없습니다");
            return;
        }

        const slot: EquipmentSlot = item.slot;

        set((state) => {

            const prevItem = state.equippedItems[slot];

            return {
                equippedItems: {
                    ...state.equippedItems,
                    [slot]: itemId,
                },
                inventory: [
                    ...state.inventory.filter(id => id !== itemId),
                    ...(prevItem ? [prevItem] : [])
                ]
            }
        })
    },

    unEquipItem: (slot: EquipmentSlot) => {
        set((state) => {
            const itemId = state.equippedItems[slot];

            if (!itemId) return state;

            return {
                equippedItems: {
                    ...state.equippedItems,
                    [slot]: null,
                },
                inventory: [...state.inventory, itemId],
            }
        })
    },

    increaseStat: (stat: keyof Stats) => set((state) => {
        if (state.remainingPoints <= 0) return state;

        return {
            stats: {
                ...state.stats,
                [stat]: state.stats[stat] + 1,
            },
            remainingPoints: state.remainingPoints - 1,
        }
    }),

    decreaseStat: (stat: keyof Stats) => set((state) => {
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