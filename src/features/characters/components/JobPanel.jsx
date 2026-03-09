import { JOBS } from "../../../data/jobs";
import { useCharacterStore } from "../store/characterStore";
import { canChangeJob } from "../utils/canChangeJob";

function JobPanel() {
    const stats = useCharacterStore((state) => state.stats);
    const changeJob = useCharacterStore((state) => state.changeJob);
    const currentJob = useCharacterStore((state) => state.job);

    return (
        <div>
            <h2>직업 선택</h2>

            {Object.entries(JOBS).map(([jobKey, job]) => {
                if (jobKey === "adventure") return null;

                const canChange = canChangeJob(jobKey, stats);

                return (
                    <div key={jobKey}>
                        {job.name} (Lv. {job.requireLevel})

                        <button
                            onClick={() => changeJob(jobKey)}
                            disabled={!canChange}
                        >
                            전직
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default JobPanel;