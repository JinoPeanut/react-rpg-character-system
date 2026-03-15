import { BASE_CRIT_DAMAGE, JOBS } from "../../../data/jobs.js";
import { EQUIPMENTS } from "../../../data/equipments.js";
import type { WeaponId, ArmorId } from "../../../data/equipments.js";
import type { JobType } from "../../../data/jobs.js";
import type { Stats } from "../../../types/stats.js";

type EquippedItems = {
    weapon: WeaponId | null,
    armor: ArmorId | null,
}

type DerivedStats = {
    attack: number
    magic: number
    defense: number
    hp: number
    critChance: number
    critDamage: number
}

export function calculateDerivedStats(
    level: number,
    job: JobType,
    stats: Stats,
    equippedItems: EquippedItems,
): DerivedStats {

    const jobData = JOBS[job]!;

    const weapon = equippedItems.weapon
        ? EQUIPMENTS.weapon[equippedItems.weapon]
        : undefined

    const armor = equippedItems.armor
        ? EQUIPMENTS.armor[equippedItems.armor]
        : undefined

    const attack = jobData.attackFormula(stats) + (weapon?.attack ?? 0);

    const magic = jobData.magicFormula(stats) + (weapon?.magic ?? 0);

    const defense = jobData.defenseFormula(stats) + (armor?.defense ?? 0);

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

