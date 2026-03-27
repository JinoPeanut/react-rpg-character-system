import { describe, it, expect } from "vitest";
import { canChangeJob } from "../features/characters/utils/canChangeJob";

describe("canChangeJob", () => {

    const defaultStats = { Str: 8, Dex: 8, Int: 8, Luk: 8 };

    it("레벨 미달이면 전직 불가", () => {
        const result = canChangeJob(
            "warrior",
            { ...defaultStats, Str: 20 },
            5,  // 10레벨 미달
        );
        expect(result).toBe(false);
    });

    it("스탯 미달이면 전직 불가", () => {
        const result = canChangeJob(
            "warrior",
            defaultStats,  // Str 8 → 20 미달
            10,
        );
        expect(result).toBe(false);
    });

    it("레벨 + 스탯 충족 시 전직 가능", () => {
        const result = canChangeJob(
            "warrior",
            { ...defaultStats, Str: 20 },
            10,
        );
        expect(result).toBe(true);
    });

    it("궁수는 Dex 20 이상이어야 전직 가능", () => {
        const fail = canChangeJob("archer", defaultStats, 10);
        const pass = canChangeJob("archer", { ...defaultStats, Dex: 20 }, 10);
        expect(fail).toBe(false);
        expect(pass).toBe(true);
    });

    it("마법사는 Int 20 이상이어야 전직 가능", () => {
        const fail = canChangeJob("mage", defaultStats, 10);
        const pass = canChangeJob("mage", { ...defaultStats, Int: 20 }, 10);
        expect(fail).toBe(false);
        expect(pass).toBe(true);
    });

    it("도적은 Luk 20 이상이어야 전직 가능", () => {
        const fail = canChangeJob("thief", defaultStats, 10);
        const pass = canChangeJob("thief", { ...defaultStats, Luk: 20 }, 10);
        expect(fail).toBe(false);
        expect(pass).toBe(true);
    });
})