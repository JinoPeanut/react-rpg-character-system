import type { WeaponId, ArmorId } from "./equipments";
import type { PotionId } from "./potions";

export type ShopItemType = "weapon" | "armor" | "potion";

export type ShopItem = {
    id: string,
    name: string,
    type: ShopItemType,
    buyPrice: number,   // 구매 가격
    sellPrice: number,  // 판매 가격
}

export const SHOP_ITEMS: Record<string, ShopItem> = {
    // 무기
    woodenSword: {
        id: "woodenSword",
        name: "나무 검",
        type: "weapon",
        buyPrice: 50,
        sellPrice: 25,
    },
    woodenStaff: {
        id: "woodenStaff",
        name: "나무 스태프",
        type: "weapon",
        buyPrice: 50,
        sellPrice: 25,
    },
    woodenDagger: {
        id: "woodenDagger",
        name: "나무 단검",
        type: "weapon",
        buyPrice: 50,
        sellPrice: 25,
    },
    woodenBow: {
        id: "woodenBow",
        name: "나무 활",
        type: "weapon",
        buyPrice: 50,
        sellPrice: 25,
    },

    // 방어구
    clothTop: {
        id: "clothTop",
        name: "천 상의",
        type: "armor",
        buyPrice: 40,
        sellPrice: 20,
    },
    clothBottom: {
        id: "clothBottom",
        name: "천 하의",
        type: "armor",
        buyPrice: 40,
        sellPrice: 20,
    },

    // 포션
    hpPotion: {
        id: "hpPotion",
        name: "체력 포션",
        type: "potion",
        buyPrice: 20,
        sellPrice: 10,
    },
    mpPotion: {
        id: "mpPotion",
        name: "마나 포션",
        type: "potion",
        buyPrice: 20,
        sellPrice: 10,
    },
    elixir: {
        id: "elixir",
        name: "엘릭서",
        type: "potion",
        buyPrice: 50,
        sellPrice: 25,
    },
}