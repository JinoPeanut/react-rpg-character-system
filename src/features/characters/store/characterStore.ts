import { create } from "zustand";
import { EQUIPMENTS } from "../../../data/equipments";
import { JOBS } from "../../../data/jobs";
import { canChangeJob } from "../utils/canChangeJob";

import type { Stats } from "../../../types/stats";
import type { JobType } from "../../../data/jobs";
import type { WeaponId, ArmorId } from "../../../data/equipments";
import { calculateDerivedStats } from "../systems/calculateDerivedStats";
import { SKILLS } from "../../../data/skills";
import { POTIONS, type PotionId } from "../../../data/potions";
import { SHOP_ITEMS } from "../../../data/shop";

type EquipmentSlot = "weapon" | "armorTop" | "armorBottom";

export type EquippedItems = {
    weapon: WeaponId | null,
    armorTop: ArmorId | null,
    armorBottom: ArmorId | null,
}

export type SkillLevel = Partial<Record<string, number>>

type CharacterState = {
    level: number,
    job: JobType,

    stats: Stats,
    baseStats: Stats,

    remainingPoints: number,

    skillPoints: number,
    skillLevels: SkillLevel,

    gold: number,
    earnGold: (amount: number) => void,
    spendGold: (amount: number) => boolean,

    buyItem: (itemId: string) => void,
    sellItem: (itemId: string) => void,

    hp: number,
    mp: number,

    exp: number,
    checkLevelUp: () => void,

    skills: string[],

    // 인벤토리 관련
    inventory: string[],
    usePotion: (potionId: string) => void,
    addItem: (itemId: string) => void,
    removeItem: (itemId: string) => void,
    equipFromInventory: (itemId: string) => void,

    equippedItems: EquippedItems,

    levelUp: () => void,
    statReset: () => void,

    changeJob: (jobKey: JobType) => void,

    equipItem: (itemId: WeaponId | ArmorId) => void,
    unEquipItem: (slot: EquipmentSlot) => void,

    increaseStat: (stat: keyof Stats) => void,
    decreaseStat: (stat: keyof Stats) => void,

    useSkill: (skillId: string) => void,

    upgradeSkill: (skillId: string) => void,
}

const defaultJob: JobType = "adventure";
const POINT_PER_LEVEL = 5;
const DEFAULT_STATS: Stats = {
    Str: 8,
    Dex: 8,
    Int: 8,
    Luk: 8,
}

const initialDerived = calculateDerivedStats(
    1,
    defaultJob,
    DEFAULT_STATS,
    { weapon: null, armorTop: null, armorBottom: null },
);

export const getRequiredExp = (level: number): number => {
    if (level < 10) {
        return level * 10;
    } else if (level < 20) {
        return level * 20;
    } else {
        return level * 30;
    }
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
    level: 1,

    job: defaultJob,

    // 캐릭터 총합 능력치
    stats: { ...DEFAULT_STATS },

    // 모험가 기본 능력치
    baseStats: { ...DEFAULT_STATS },

    levelUp: () => {
        set((state) => {
            const derived = calculateDerivedStats(
                state.level + 1,
                state.job,
                state.stats,
                state.equippedItems,
            );

            return {
                level: state.level + 1,
                remainingPoints: state.remainingPoints + POINT_PER_LEVEL,
                skillPoints: state.job === "adventure"
                    ? state.skillPoints + 1
                    : state.skillPoints + 1,
                hp: derived.hp,
                mp: derived.mp,

            }
        })
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

        const jobData = JOBS[jobKey];
        const requireLevel = jobData.requireLevel ?? 1;

        const skillPointsOnJob = state.level - requireLevel + 1;

        return {
            job: jobKey,
            skillPoints: skillPointsOnJob,
            skillLevels: {},
        }
    }),

    // 남은 캐릭터 스탯
    remainingPoints: 0,

    skillPoints: 1,
    skillLevels: {},

    gold: 0,

    earnGold: (amount: number) => {
        set((state) => ({ gold: state.gold + amount }))
    },

    spendGold: (amount: number) => {
        const state = get();
        if (state.gold < amount) return false;
        set({ gold: state.gold - amount })
        return true;
    },

    buyItem: (itemId: string) => {
        const state = get();
        const shopItem = SHOP_ITEMS[itemId];

        if (!shopItem) {
            console.log("상점에 없는 아이템입니다");
            return;
        }

        if (state.gold < shopItem.buyPrice) {
            console.log("골드가 부족합니다");
            return;
        }

        set({
            gold: state.gold - shopItem.buyPrice,
            inventory: [...state.inventory, itemId],
        })
    },

    sellItem: (itemId: string) => {
        const state = get();
        const shopItem = SHOP_ITEMS[itemId];

        if (!shopItem) {
            console.log("판매할 수 없는 아이템 입니다");
            return;
        }

        if (!state.inventory.includes(itemId)) {
            console.log("인벤토리에 없는 아이템 입니다");
            return;
        }

        const idx = state.inventory.indexOf(itemId);
        const newInventory = [
            ...state.inventory.slice(0, idx),
            ...state.inventory.slice(idx + 1),
        ];

        set({
            gold: state.gold + shopItem.sellPrice,
            inventory: newInventory,
        })
    },

    hp: initialDerived.hp,
    mp: initialDerived.mp,

    exp: 0,
    checkLevelUp: () => {
        const state = get();
        const required = getRequiredExp(state.level);

        if (state.exp >= required) {
            const derived = calculateDerivedStats(
                state.level + 1,
                state.job,
                state.stats,
                state.equippedItems,
            );

            set({
                level: state.level + 1,
                exp: state.exp - required,
                remainingPoints: state.remainingPoints + POINT_PER_LEVEL,
                skillPoints: state.skillPoints + 1,
                hp: derived.hp,
                mp: derived.mp,
            });

            get().checkLevelUp();
        }
    },

    // 캐릭터가 가진 스킬들
    skills: [],

    inventory: [
        "woodenSword", "clothTop",
        "clothBottom", "woodenStaff",
        "woodenDagger", "woodenBow",
        "hpPotion", "mpPotion",
    ],

    usePotion: (potionId: string) => {
        const state = get();

        if (!state.inventory.includes(potionId)) {
            console.log("포션이 없습니다");
            return;
        }

        const potion = POTIONS[potionId as PotionId];
        if (!potion) return;

        const derived = calculateDerivedStats(
            state.level,
            state.job,
            state.stats,
            state.equippedItems,
        );

        const newHp = Math.min(derived.hp, state.hp + potion.hpRestore);
        const newMp = Math.min(derived.mp, state.mp + potion.mpRestore);

        const idx = state.inventory.indexOf(potionId);
        const newInventory = [
            ...state.inventory.slice(0, idx),
            ...state.inventory.slice(idx + 1),
        ];

        set({
            hp: newHp,
            mp: newMp,
            inventory: newInventory,
        })
    },

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

    useSkill: (skillId: string) => {
        const state = get();

        const skillData = SKILLS[state.job]?.[skillId];

        if (!skillData) {
            console.log("스킬을 찾을 수 없습니다");
            return;
        }

        if (skillData.cost === null) {
            console.log("아직 구현되지 않은 스킬입니다");
            return;
        }

        if (state.mp < skillData.cost) {
            console.log("마나가 부족합니다");
            return;
        }

        set({ mp: state.mp - skillData.cost });
    },

    upgradeSkill: (skillId: string) => {
        const state = get();

        if (state.skillPoints <= 0) {
            console.log("스킬 포인트가 부족합니다");
            return;
        }

        const skillData = SKILLS[state.job]?.[skillId];

        if (!skillData || skillData.maxLevel === null) {
            console.log("스킬을 찾을 수 없습니다");
            return;
        }

        const currentLevel = state.skillLevels[skillId] ?? 0;

        if (currentLevel >= skillData.maxLevel) {
            console.log("최대 레벨입니다");
            return;
        }

        set({
            skillPoints: state.skillPoints - 1,
            skillLevels: {
                ...state.skillLevels,
                [skillId]: currentLevel + 1,
            }
        });
    },
}));