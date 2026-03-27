import { describe, it, expect } from "vitest";
import { getRequiredExp } from "../features/characters/store/characterStore";

describe("getRequiredExp", () => {

    it("1레벨 필요 경험치는 10 이어야 한다", () => {
        expect(getRequiredExp(1)).toBe(10);
    });

    it("5레벨 필요 경험치는 50 이어야 한다", () => {
        expect(getRequiredExp(5)).toBe(50);
    });

    it("9레벨 필요 경험치는 90 이어야 한다", () => {
        expect(getRequiredExp(9)).toBe(90);
    });

    it("10레벨 필요 경험치는 200 이어야 한다 (구간 변경)", () => {
        expect(getRequiredExp(10)).toBe(200);
    });

    it("15레벨 필요 경험치는 300 이어야 한다", () => {
        expect(getRequiredExp(15)).toBe(300);
    });

    it("20레벨 필요 경험치는 600 이어야 한다 (구간 변경)", () => {
        expect(getRequiredExp(20)).toBe(600);
    });

    it("레벨이 오를수록 필요 경험치가 증가해야 한다", () => {
        expect(getRequiredExp(2)).toBeGreaterThan(getRequiredExp(1));
        expect(getRequiredExp(10)).toBeGreaterThan(getRequiredExp(9));
        expect(getRequiredExp(20)).toBeGreaterThan(getRequiredExp(19));
    });
})