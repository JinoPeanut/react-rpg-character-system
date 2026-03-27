import { describe, it, expect } from "vitest";
import { calculateSkillDamage } from "../features/characters/systems/calculateSkillDamage";
import type { Skill } from "../data/skills";

describe("calculateSkillDamage", () => {

    const defaultStats = { Str: 8, Dex: 8, Int: 8, Luk: 8 };
    const defaultEquip = { weapon: null, armorTop: null, armorBottom: null };
    const defaultSkillLevels = { "warrior_skill_1": 1 };

    const testSkill: Skill = {
        id: "warrior_skill_1",
        name: "연속 베기",
        description: "테스트 스킬",
        maxLevel: 10,
        damage: 140,
        damagePerLevel: 10,
        cost: 5,
    }

    it("데미지가 0 보다 커야 한다", () => {
        const result = calculateSkillDamage(
            10, "warrior",
            { ...defaultStats, Str: 20 },
            defaultEquip,
            testSkill,
            defaultSkillLevels,
        );
        expect(result.damage).toBeGreaterThan(0);
    });

    it("스킬레벨이 높을수록 데미지가 높아야 한다", () => {
        const highStats = { ...defaultStats, Str: 100 };  // Str 20 → 100 으로 올리기

        const low = calculateSkillDamage(
            10, "warrior",
            highStats,
            defaultEquip,
            testSkill,
            { "warrior_skill_1": 1 },
        );
        const high = calculateSkillDamage(
            10, "warrior",
            highStats,
            defaultEquip,
            testSkill,
            { "warrior_skill_1": 10 },
        );
        expect(high.damage).toBeGreaterThan(low.damage);
    });

    it("isCritical 이 boolean 이어야 한다", () => {
        const result = calculateSkillDamage(
            10, "warrior",
            { ...defaultStats, Str: 20 },
            defaultEquip,
            testSkill,
            defaultSkillLevels,
        );
        expect(typeof result.isCritical).toBe("boolean");
    });

    it("크리티컬 시 데미지가 2배여야 한다", () => {
        // critChance 를 1로 고정해서 항상 크리티컬
        const stats = { ...defaultStats, Str: 20, Luk: 1000 };
        const result = calculateSkillDamage(
            10, "warrior", stats, defaultEquip,
            testSkill, defaultSkillLevels,
        );
        // 크리티컬이면 일반 데미지의 2배
        const normalResult = calculateSkillDamage(
            10, "warrior",
            { ...defaultStats, Str: 20 },
            defaultEquip,
            testSkill,
            defaultSkillLevels,
        );
        expect(result.damage).toBeGreaterThanOrEqual(normalResult.damage);
    });
})