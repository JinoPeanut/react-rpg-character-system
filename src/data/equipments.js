export const EQUIPMENTS = {
    weapon: {
        woodenSword: {
            name: "나무 검",
            attack: 3,
            allowedJobs: ["warrior"],
        },

        woodenStaff: {
            name: "나무 스태프",
            magic: 3,
            allowedJobs: ["mage"],
        },

        woodenBow: {
            name: "나무 활",
            attack: 3,
            allowedJobs: ["archer"],
        },

        woodenDagger: {
            name: "나무 단검",
            attack: 3,
            allowedJobs: ["thief"],
        },
    },

    armor: {
        clothTop: {
            name: "천 상의",
            hp: 10,
            defense: 2,
        },

        clothBottom: {
            name: "천 하의",
            hp: 10,
            defense: 2,
        }
    }
}