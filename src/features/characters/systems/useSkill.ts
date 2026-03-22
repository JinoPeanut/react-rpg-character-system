import { JOBS, type JobType } from "../../../data/jobs";
import type { Stats } from "../../../types/stats";
import type { EquippedItems } from "../store/characterStore";
import { calculateDerivedStats } from "./calculateDerivedStats";


export function useSkill(
    level: number,
    job: JobType,
    stats: Stats,
    equipments: EquippedItems,
) {

    const derived = calculateDerivedStats(level, job, stats, equipments);

    const jobData = JOBS[job];

    const mainStat = jobData.mainStat
        ? stats[jobData.mainStat]
        : 0;

    const attackOrMagic = derived[jobData.attackType];
}
