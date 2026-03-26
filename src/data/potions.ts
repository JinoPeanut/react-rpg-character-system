export type Potion = {
    id: string,
    name: string,
    hpRestore: number,
    mpRestore: number,
}

export type PotionId = keyof typeof POTIONS;

export const POTIONS: Record<string, Potion> = {
    hpPotion: {
        id: "hpPotion",
        name: "체력 포션",
        hpRestore: 50,
        mpRestore: 0,
    },

    mpPotion: {
        id: "mpPotion",
        name: "마나 포션",
        hpRestore: 0,
        mpRestore: 30,
    },

    elixir: {
        id: "elixir",
        name: "엘릭서",
        hpRestore: 100,
        mpRestore: 100,
    }
}