import { useCharacterStore } from "../store/characterStore";
import { SKILLS } from "../../../data/skills";
import type { JobType } from "../../../data/jobs";

export function SkillPanel() {
    const job = useCharacterStore((state) => state.job);
    const skillPoints = useCharacterStore((state) => state.skillPoints);
    const skillLevels = useCharacterStore((state) => state.skillLevels);
    const upgradeSkill = useCharacterStore((state) => state.upgradeSkill);

    const jobSkills = SKILLS[job as JobType];

    return (
        <div className="p-4 bg-gray-400 w-[500px]">

            {/* 스킬 포인트 잔여량 */}
            <div className="mb-4 text-right">
                <span className="text-yellow-400 font-bold">
                    스킬 포인트: {skillPoints}
                </span>
            </div>

            <div className="flex flex-col gap-3">
                {Object.entries(jobSkills).map(([skillKey, skill]) => {
                    if (!skill) return null;

                    const skillLevel = skillLevels[skill.id] ?? 0;
                    const isActive = skillLevel > 0;
                    const isMaxLevel = skill.maxLevel !== null && skillLevel >= skill.maxLevel;
                    const canUpgrade = skillPoints > 0 && !isMaxLevel && skill.cost !== null;

                    // 현재 데미지% 계산
                    const currentDamage = skill.damage !== null && skill.maxLevel !== null
                        ? skill.maxLevel > 1
                            ? skill.damage + (skill.damagePerLevel ?? 0) * (skillLevel - 1) / (skill.maxLevel - 1)
                            : skill.damage
                        : null;

                    return (
                        <div
                            key={skillKey}
                            className={`
                                border rounded-lg p-4 flex justify-between items-center
                                transition-all duration-300
                                ${isActive
                                    ? "border-blue-400 bg-blue-950 text-white"
                                    : "border-gray-600 bg-gray-800 text-gray-400"
                                }
                            `}
                        >
                            {/* 왼쪽: 스킬 정보 */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    {/* 활성화 여부 표시 */}
                                    <span className={`
                                        w-2 h-2 rounded-full
                                        ${isActive ? "bg-blue-400" : "bg-gray-600"}
                                    `} />
                                    <span className="font-bold">
                                        {skill.name || "???"}
                                    </span>
                                    <span className="text-sm">
                                        Lv. {skillLevel}
                                        {skill.maxLevel && ` / ${skill.maxLevel}`}
                                    </span>
                                </div>

                                {/* 설명 + 현재 데미지% */}
                                <div className="text-sm ml-4">
                                    {currentDamage !== null
                                        ? `데미지: ${skillLevel === 0 ? "??? " : Math.floor(currentDamage)}%`
                                        : "미구현 스킬"
                                    }
                                </div>
                            </div>

                            {/* 오른쪽: 찍기 버튼 */}
                            <button
                                onClick={() => upgradeSkill(skill.id)}
                                disabled={!canUpgrade}
                                className={`
                                    px-4 py-2 rounded-lg transition
                                    active:scale-95
                                    ${canUpgrade
                                        ? "bg-cyan-500 text-white hover:bg-cyan-600 cursor-pointer"
                                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    }
                                `}
                            >
                                {isMaxLevel ? "MAX" : "+ 찍기"}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SkillPanel;