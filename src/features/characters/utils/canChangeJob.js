import { JOBS } from "../../../data/jobs";

export function canChangeJob(jobKey, stats) {
    const requirement = JOBS[jobKey].requirement;

    if (!requirement) return false;

    return Object.entries(requirement).every(([stat, value]) => stats[stat] >= value);
}