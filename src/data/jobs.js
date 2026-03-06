export const JOBS = {

    adventure: {
        name: "모험가",
        baseStats: {
            Str: 8,
            Dex: 8,
            Int: 8,
            Luk: 8,
        },
    },

    warrior: {
        name: "전사",
        requirement: {
            Str: 20,
        }
    },

    archer: {
        name: "궁수",
        requirement: {
            Dex: 20,
        }
    },

    mage: {
        name: "마법사",
        requirement: {
            Int: 20,
        }
    },

    theif: {
        name: "도적",
        requirement: {
            Luk: 20,
        }
    },
};