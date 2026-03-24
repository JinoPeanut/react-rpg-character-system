import { useState } from "react";
import { JOBS, type JobType } from "../../../data/jobs";
import { useCharacterStore } from "../store/characterStore";
import { canChangeJob } from "../utils/canChangeJob";

export function JobPanel() {
    const stats = useCharacterStore((state) => state.stats);
    const level = useCharacterStore((state) => state.level);
    const changeJob = useCharacterStore((state) => state.changeJob);
    const currentJob = useCharacterStore((state) => state.job);

    const [selectJob, setSelectJob] = useState<JobType | null>(null);

    return (
        <div>
            <div className="flex gap-4 bg-gray-400 p-4 rounded">
                {(Object.keys(JOBS) as JobType[]).map((jobKey) => {
                    if (jobKey === "adventure") return null;

                    const job = JOBS[jobKey];
                    const canChange = canChangeJob(jobKey, stats, level);

                    return (
                        <div key={jobKey}>
                            <div onClick={() => setSelectJob(jobKey)}
                                className={`
                                border p-4 rounded
                                cursor-pointer
                                ${selectJob === jobKey
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-300 hover:bg-gray-200"
                                    }
                            `}>
                                {job.name} (Lv. {job.requireLevel})
                            </div>

                            <button
                                onClick={() => changeJob(jobKey)}
                                disabled={!canChange || currentJob !== "adventure"}
                                className={`
                                w-full mt-4 py-2 rounded-lg
                                bg-purple-500 text-white
                                hover:bg-purple-600
                                active:scale-95
                                transition
                                ${canChange && currentJob === "adventure"
                                        ? "cursor-pointer animate-glow"
                                        : "bg-gray-500 text-gray-400"}`}
                            >
                                {currentJob !== "adventure" ? "전직 완료" : "전직"}
                            </button>
                        </div>
                    )
                })}
            </div>
            <div
                className="
                    mt-6 border p-4 rounded w-full break-words
                    max-w-2xl min-h-[120px] whitespace-pre-line
                    text-gray-400
                ">
                {selectJob && (
                    <div className="mt-6 border p-4 rounded">
                        <h3>{JOBS[selectJob]?.name}</h3>
                        <p>{JOBS[selectJob]?.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobPanel;