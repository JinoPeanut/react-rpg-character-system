import { useState } from "react";
import { JOBS, type JobType } from "../../../data/jobs";
import { useCharacterStore } from "../store/characterStore";
import { canChangeJob } from "../utils/canChangeJob";

const JOB_ICONS: Record<string, string> = {
    warrior: "⚔️",
    archer: "🏹",
    mage: "✨",
    thief: "🗡️",
}

export function JobPanel() {
    const stats = useCharacterStore((state) => state.stats);
    const level = useCharacterStore((state) => state.level);
    const changeJob = useCharacterStore((state) => state.changeJob);
    const currentJob = useCharacterStore((state) => state.job);

    const [selectJob, setSelectJob] = useState<JobType | null>(null);
    const selectedJobData = selectJob ? JOBS[selectJob] : null;

    return (
        <div>
            <div className="
                    bg-gray-900 border border-gray-700 rounded p-4
                    w-[500px] mx-auto
                ">
                <h2 className="text-lg font-bold text-gray-200 mb-4 text-center">
                    전직
                </h2>

                {/* 전직불가 안내 */}
                {currentJob !== "adventure" && (
                    <div className="
                        mb-4 text-center text-purple-400 text-sm
                        bg-purple-900/30 border border-purple-700
                        rounded-lg py-2
                    ">
                        ✦ 이미 전직이 완료되었습니다
                    </div>
                )}

                {/* 직업 카드목록 */}
                <div className="grid grid-cols-4 gap-2">
                    {(Object.keys(JOBS) as JobType[]).map((jobKey) => {
                        if (jobKey === "adventure") return null;

                        const job = JOBS[jobKey];
                        const canChange = canChangeJob(jobKey, stats, level);
                        const isSelected = selectJob === jobKey;
                        const isCurrentJob = currentJob === jobKey;

                        return (
                            <div
                                key={jobKey}
                                onClick={() => setSelectJob(jobKey)}
                                className={`
                                    flex flex-col items-center justify-center
                                    gap-1 p-3 rounded-lg border cursor-pointer
                                    transition-all duration-200
                                    ${isCurrentJob
                                        ? "border-purple-400 bg-purple-900/40 text-purple-300"
                                        : isSelected
                                            ? "border-blue-400 bg-blue-900/40 text-blue-300"
                                            : canChange
                                                ? "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-400"
                                                : "border-gray-700 bg-gray-800/50 text-gray-600"
                                    }
                                `}
                            >
                                <span className="text-2xl">
                                    {JOB_ICONS[jobKey]}
                                </span>
                                <span className="text-xs font-semibold">
                                    {job.name}
                                </span>
                                <span className="text-xs opacity-60">
                                    Lv. {job.requireLevel}
                                </span>
                            </div>
                        )
                    })}
                </div>

                {/* 직업 설명 */}
                <div className="mt-4 min-h-[120px] bg-gray-800
                    border border-gray-700 rounded-lg p-4
                    ">
                    {selectedJobData ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">
                                    {JOB_ICONS[selectJob!]}
                                </span>
                                <h3 className="text-gray-200 font-bold">
                                    {selectedJobData.name}
                                </h3>
                                <span className="text-gray-500 text-xs ml-auto">
                                    요구레벨 {selectedJobData.requireLevel}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {selectedJobData.description}
                            </p>

                            {/* 요구 스탯 */}
                            {selectedJobData.requirement && (
                                <div className="flex gap-2 flex-wrap mt-1">
                                    {Object.entries(selectedJobData.requirement).map(([stat, value]) => {
                                        const isMet = stats[stat as keyof typeof stats] >= (value ?? 0);
                                        return (
                                            <span key={stat}
                                                className={`text-xs px-2 py-1 rounded-full border
                                            ${isMet
                                                        ? "border-green-600 text-green-400"
                                                        : "border-red-700 text-red-400"
                                                    }`}
                                            >
                                                {stat} {value} {isMet ? "✓" : "✗"}
                                            </span>
                                        )
                                    })}
                                </div>
                            )}

                            {/* 전직버튼 */}
                            <button
                                onClick={() => changeJob(selectJob!)}
                                disabled={
                                    !canChangeJob(selectJob!, stats, level)
                                    || currentJob !== "adventure"
                                }
                                className={`
                                mt-2 w-full py-2 rounded-lg text-sm
                                font-semibold transition active:scale-95
                                ${canChangeJob(selectJob!, stats, level)
                                        && currentJob === "adventure"
                                        ? "bg-purple-600 hover:bg-purple-500 text-white cursor-pointer"
                                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    }
                            `}
                            >
                                {currentJob !== "adventure" ? "✦ 전직 완료" : "✦ 전직하기"}
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600 text-sm text-center mt-8">
                            직업을 선택하면 설명이 표시됩니다
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobPanel;