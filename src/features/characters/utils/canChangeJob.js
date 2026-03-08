import { JOBS } from "../../../data/jobs";

export function canChangeJob(jobKey, stats, level) {
    const job = JOBS[jobKey];
    if (!job) return false;

    if (level < job.requireLevel) return false;

    for (const stat in jobKey.requirement) {
        if (stats[stat] < jobKey.requirement[stat]) {
            return false;
        }
    }

    return true;
}