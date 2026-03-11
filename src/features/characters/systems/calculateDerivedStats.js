import { BASE_CRIT_DAMAGE, JOBS } from "../../../data/jobs";

export function calculateDerivedStats(level, job, stats) {

    const jobData = JOBS[job];

    const attack = jobData.attackFormula(stats);
    const magic = jobData.magicFormula(stats);
    const hp = jobData.hpFormula(level, jobData, stats);
    const critChance = jobData.baseCritChance;
    const defense = jobData.defenseFormula(stats);
    const critDamage = BASE_CRIT_DAMAGE;

    return {
        attack,
        magic,
        hp,
        critChance,
        defense,
        critDamage,
    }
}

