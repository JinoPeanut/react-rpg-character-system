import { useBattleStore } from "../store/battleStore";
import { useCharacterStore } from "../store/characterStore";
import { MONSTERS, type MonsterId } from "../../../data/monsters";
import { SKILLS } from "../../../data/skills";
import { calculateDerivedStats } from "../systems/calculateDerivedStats";
import type { JobType } from "../../../data/jobs";
import { useRef, useEffect, useState } from "react";
import { POTIONS, type PotionId } from "../../../data/potions";

export function BattlePanel() {
    const {
        currentMonster, monsterHp, battleLog,
        isBattling, isPlayerTurn, result,
        startBattle, playerUseSkill, endBattle, resetBattle,
    } = useBattleStore();

    const {
        job, level, stats, equippedItems,
        skillLevels, hp, mp,
        inventory, usePotion,
    } = useCharacterStore();

    const [actionTab, setActionTab] = useState<"skill" | "potion">("skill");

    const logRef = useRef<HTMLDivElement>(null);

    // 로그 자동 스크롤
    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [battleLog]);

    const derived = calculateDerivedStats(level, job, stats, equippedItems);
    const jobSkills = SKILLS[job as JobType];

    // HP/MP 바 계산
    const hpPercent = Math.min(100, Math.max(0, (hp / derived.hp) * 100));
    const mpPercent = Math.min(100, Math.max(0, (mp / derived.mp) * 100));
    const monsterHpPercent = currentMonster
        ? Math.max(0, (monsterHp / currentMonster.hp) * 100)
        : 0;

    // 몬스터 선택 화면
    if (!isBattling && result === null) {
        return (
            <div className="bg-gray-900 border border-gray-700 
                rounded-lg p-4 w-[500px] mx-auto">
                <h2 className="text-lg font-bold text-gray-200 mb-4 text-center">
                    전투
                </h2>
                <p className="text-gray-400 text-sm text-center mb-4">
                    전투할 몬스터를 선택하세요
                </p>

                <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(MONSTERS) as MonsterId[]).map((monsterId) => {
                        const monster = MONSTERS[monsterId];

                        if (!monster) return;

                        return (
                            <div
                                key={monsterId}
                                onClick={() => startBattle(monsterId)}
                                className="
                                    bg-gray-800 border border-gray-600
                                    rounded-lg p-4 cursor-pointer
                                    hover:border-red-400 hover:bg-gray-700
                                    transition-all duration-200
                                    active:scale-95
                                "
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-200 font-bold">
                                        {monster.name}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        Lv. {monster.level}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 flex flex-col gap-1">
                                    <span className="text-red-400">
                                        ❤️ HP {monster.hp}
                                    </span>
                                    <span className="text-orange-400">
                                        ⚔️ 공격력 {monster.attack}
                                    </span>
                                    <span className="text-green-400">
                                        🛡️ 방어력 {monster.defense}
                                    </span>
                                    <span className="text-yellow-400">
                                        ⭐ 경험치 {monster.exp}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    // 승리/패배 화면
    if (!isBattling && result !== null) {
        return (
            <div className="bg-gray-900 border border-gray-700
                rounded-lg p-4 w-[500px] mx-auto">
                <div className={`text-center text-2xl font-bold mb-4
                    ${result === "win" ? "text-yellow-400" : "text-red-400"}`}>
                    {result === "win" ? "🏆 승리!" : "💀 패배..."}
                </div>

                {/* 전투 로그 */}
                <div className="bg-gray-800 border border-gray-700 
                    rounded-lg p-3 mb-4 h-40 overflow-y-auto">
                    {battleLog.map((log, i) => (
                        <p key={i} className="text-gray-300 text-sm">
                            {log}
                        </p>
                    ))}
                </div>

                <button
                    onClick={resetBattle}
                    className="w-full py-2 rounded-lg bg-blue-600 
                        hover:bg-blue-500 text-white font-semibold
                        transition active:scale-95 cursor-pointer"
                >
                    돌아가기
                </button>
            </div>
        )
    }

    // 전투 화면
    return (
        <div className="bg-gray-900 border border-gray-700
            rounded-lg p-4 w-[500px] mx-auto flex flex-col gap-4">

            {/* 몬스터 영역 */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-200 font-bold">
                        👾 {currentMonster?.name}
                    </span>
                    <span className="text-gray-500 text-xs">
                        Lv. {currentMonster?.level}
                    </span>
                </div>
                {/* 몬스터 HP 바 */}
                <div className="flex items-center gap-2">
                    <span className="text-red-400 text-xs w-6">HP</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-red-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${monsterHpPercent}%` }}
                        />
                    </div>
                    <span className="text-gray-400 text-xs w-20 text-right">
                        {monsterHp} / {currentMonster?.hp}
                    </span>
                </div>
            </div>

            {/* 플레이어 HP/MP */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col gap-2">
                {/* HP 바 */}
                <div className="flex items-center gap-2">
                    <span className="text-red-400 text-xs w-6">HP</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-red-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${hpPercent}%` }}
                        />
                    </div>
                    <span className="text-gray-400 text-xs w-20 text-right">
                        {hp} / {derived.hp}
                    </span>
                </div>
                {/* MP 바 */}
                <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-xs w-6">MP</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${mpPercent}%` }}
                        />
                    </div>
                    <span className="text-gray-400 text-xs w-20 text-right">
                        {mp} / {derived.mp}
                    </span>
                </div>
            </div>

            {/* 전투 로그 */}
            <div
                ref={logRef}
                className="bg-gray-800 border border-gray-700
                    rounded-lg p-3 h-32 overflow-y-auto flex flex-col gap-1"
            >
                {battleLog.map((log, i) => (
                    <p key={i} className="text-gray-300 text-sm">
                        {log}
                    </p>
                ))}
            </div>

            {/* 스킬 목록 */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">

                {/* 탭 버튼 */}
                <div className="flex border-b border-gray-700">
                    <button
                        onClick={() => setActionTab("skill")}
                        className={`
                flex-1 py-2 text-sm font-semibold transition
                ${actionTab === "skill"
                                ? "bg-cyan-900/50 text-cyan-400 border-b-2 border-cyan-400"
                                : "text-gray-500 hover:text-gray-300"
                            }
            `}
                    >
                        ⚔️ 스킬
                    </button>
                    <button
                        onClick={() => setActionTab("potion")}
                        className={`
                flex-1 py-2 text-sm font-semibold transition
                ${actionTab === "potion"
                                ? "bg-green-900/50 text-green-400 border-b-2 border-green-400"
                                : "text-gray-500 hover:text-gray-300"
                            }
            `}
                    >
                        🧪 포션
                    </button>
                </div>

                {/* 스킬 탭 */}
                {actionTab === "skill" && (
                    <div className="grid grid-cols-2 gap-2 p-3">
                        {Object.entries(jobSkills).map(([skillKey, skill]) => {
                            if (!skill || skill.cost === null) return null;

                            const skillLevel = skillLevels[skill.id] ?? 0;
                            const isActive = skillLevel > 0;
                            const isDisabled = !isActive || !isPlayerTurn || mp < skill.cost;

                            const currentDamage = skill.damage !== null && skill.maxLevel !== null
                                ? skill.maxLevel > 1
                                    ? Math.floor(skill.damage + (skill.damagePerLevel ?? 0)
                                        * (skillLevel - 1) / (skill.maxLevel - 1))
                                    : skill.damage
                                : null;

                            return (
                                <button
                                    key={skillKey}
                                    onClick={() => playerUseSkill(skill.id)}
                                    disabled={isDisabled}
                                    className={`
                            p-3 rounded-lg border text-left
                            transition-all duration-200 active:scale-95
                            ${isDisabled
                                            ? "border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed"
                                            : "border-cyan-600 bg-cyan-900/30 text-white hover:bg-cyan-900/50 cursor-pointer"
                                        }
                        `}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm">
                                            {skill.name || "???"}
                                        </span>
                                        <span className={`text-xs ${mp < (skill.cost ?? 0)
                                            ? "text-red-400" : "text-blue-400"}`}>
                                            MP {skill.cost}
                                        </span>
                                    </div>
                                    <div className="text-xs mt-1 text-gray-400">
                                        {isActive
                                            ? `Lv.${skillLevel} / ${currentDamage}% 데미지`
                                            : "스킬 미습득"
                                        }
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}

                {/* 포션 탭 */}
                {actionTab === "potion" && (
                    <div className="grid grid-cols-3 gap-2 p-3">
                        {(Object.keys(POTIONS) as PotionId[]).map((potionId) => {
                            const potion = POTIONS[potionId];
                            const count = inventory.filter((id) => id === potionId).length;
                            const isDisabled = count <= 0 || !isPlayerTurn;

                            if (!potion) return;

                            return (
                                <button
                                    key={potionId}
                                    onClick={() => usePotion(potionId)}
                                    disabled={isDisabled}
                                    className={`
                                        p-3 rounded-lg border text-center
                                        transition-all duration-200 active:scale-95
                                        ${isDisabled
                                            ? "border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed"
                                            : "border-green-600 bg-green-900/30 text-white hover:bg-green-900/50 cursor-pointer"
                                        }
                                    `}
                                >
                                    <div className="text-lg mb-1">
                                        {potionId === "hpPotion" ? "❤️"
                                            : potionId === "mpPotion" ? "💧"
                                                : "✨"}
                                    </div>
                                    <div className="font-semibold text-xs">
                                        {potion.name}
                                    </div>
                                    <div className="text-xs mt-1 text-gray-400">
                                        {potion.hpRestore > 0 && `HP +${potion.hpRestore}`}
                                        {potion.hpRestore > 0 && potion.mpRestore > 0 && " "}
                                        {potion.mpRestore > 0 && `MP +${potion.mpRestore}`}
                                    </div>
                                    <div className={`text-xs mt-1 font-bold
                            ${count > 0 ? "text-yellow-400" : "text-gray-600"}`}>
                                        {count}개
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* 턴 표시 */}
            <div className={`text-center text-sm font-semibold
                ${isPlayerTurn ? "text-cyan-400" : "text-red-400"}`}>
                {isPlayerTurn ? "⚔️ 플레이어 턴" : "👾 몬스터 턴..."}
            </div>
        </div>
    )
}

export default BattlePanel;