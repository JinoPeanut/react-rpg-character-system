import { describe, it, expect } from "vitest";
import { calculateDerivedStats } from "../features/characters/systems/calculateDerivedStats";

describe("calculateDerivedStats", () => {

    const defaultStats = { Str: 8, Dex: 8, Int: 8, Luk: 8 };
    const defaultEquip = { weapon: null, armorTop: null, armorBottom: null };

    it("모험가 1레벨 기본 HP 는 10 이어야 한다", () => {
        const result = calculateDerivedStats(1, "adventure", defaultStats, defaultEquip);
        expect(result.hp).toBe(10);
    });

    it("모험가 1레벨 기본 MP 는 10 이어야 한다", () => {
        const result = calculateDerivedStats(1, "adventure", defaultStats, defaultEquip);
        expect(result.mp).toBe(10);
    });

    it("전사는 Str 이 높을수록 공격력이 높아야 한다", () => {
        const lowStr = calculateDerivedStats(10, "warrior", { ...defaultStats, Str: 20 }, defaultEquip);
        const highStr = calculateDerivedStats(10, "warrior", { ...defaultStats, Str: 40 }, defaultEquip);
        expect(highStr.attack).toBeGreaterThan(lowStr.attack);
    });

    it("마법사는 attackType 이 magic 이어야 한다", () => {
        const result = calculateDerivedStats(10, "mage", { ...defaultStats, Int: 20 }, defaultEquip);
        expect(result.magic).toBeGreaterThan(0);
        expect(result.attack).toBe(0);
    });
})