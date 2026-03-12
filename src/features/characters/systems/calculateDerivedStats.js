import { BASE_CRIT_DAMAGE, JOBS } from "../../../data/jobs";
import { EQUIPMENTS } from "../../../data/equipments";

export function calculateDerivedStats(level, job, stats, equippedItems) {

    const jobData = JOBS[job];

    const weapon = EQUIPMENTS.weapon[equippedItems.weapon];
    const armor = EQUIPMENTS.armor[equippedItems.weapon];

    let attack = jobData.attackFormula(stats);
    attack += weapon?.attack ?? 0;

    const magic = jobData.magicFormula(stats);
    magic += weapon?.magic ?? 0;

    const defense = jobData.defenseFormula(stats);
    defense += armor?.defense ?? 0;

    const hp = jobData.hpFormula(level, jobData, stats);
    const critChance = jobData.baseCritChance;
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

