export type Drop = {
    itemId: string,
    chance: number,  // 각 아이템마다 드롭 확률 개별 적용
}

export type Monster = {
    id: string,
    name: string,
    level: number,
    hp: number,
    attack: number,
    defense: number,
    exp: number,
    drops: Drop[],  // 여러 개 드롭 가능하도록 배열로
}

export type MonsterId = keyof typeof MONSTERS;

export const MONSTERS: Record<string, Monster> = {
    slime: {
        id: "slime",
        name: "슬라임",
        level: 1,
        hp: 10,
        attack: 3,
        defense: 1,
        exp: 10,
        drops: [
            { itemId: "hpPotion", chance: 0.5 },
            { itemId: "mpPotion", chance: 0.5 },
            { itemId: "woodenSword", chance: 0.3 },
            { itemId: "clothTop", chance: 0.1 },
        ],
    },

    goblin: {
        id: "goblin",
        name: "고블린",
        level: 5,
        hp: 60,
        attack: 12,
        defense: 5,
        exp: 25,
        drops: [
            { itemId: "hpPotion", chance: 0.5 },
            { itemId: "mpPotion", chance: 0.5 },
            { itemId: "clothTop", chance: 0.3 },
            { itemId: "clothBottom", chance: 0.2 },
        ],
    },

    orc: {
        id: "orc",
        name: "오크",
        level: 10,
        hp: 120,
        attack: 25,
        defense: 12,
        exp: 60,
        drops: [
            { itemId: "hpPotion", chance: 0.5 },
            { itemId: "mpPotion", chance: 0.5 },
            { itemId: "clothBottom", chance: 0.25 },
            { itemId: "woodenDagger", chance: 0.15 },
        ],
    },

    darkKnight: {
        id: "darkKnight",
        name: "다크나이트",
        level: 15,
        hp: 200,
        attack: 40,
        defense: 20,
        exp: 100,
        drops: [
            { itemId: "hpPotion", chance: 0.5 },
            { itemId: "mpPotion", chance: 0.5 },
            { itemId: "elixir", chance: 0.1 },
            { itemId: "woodenDagger", chance: 0.2 },
            { itemId: "woodenBow", chance: 0.1 },
        ],
    },
}