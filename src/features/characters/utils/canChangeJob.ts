import { JOBS } from "../../../data/jobs";
import type { Stats } from "../../../types/stats";
import type { JobType } from "../../../data/jobs";

export function canChangeJob(jobKey: JobType, stats: Stats, level: number) {
    const job = JOBS[jobKey];
    if (!job) return false;

    if (job.requireLevel && level < job.requireLevel) return false;

    if (!job.requirement) return true;

    for (const [stat, value] of Object.entries(job.requirement)) {
        const key = stat as keyof Stats;

        if (stats[key] < value) {
            return false;
        }
    }

    return true;
}