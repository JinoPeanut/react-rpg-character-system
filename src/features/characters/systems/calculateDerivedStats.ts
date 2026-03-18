import { BASE_CRIT_DAMAGE, JOBS } from "../../../data/jobs.js";
import { EQUIPMENTS } from "../../../data/equipments.js";
import type { WeaponId, ArmorId } from "../../../data/equipments.js";
import type { JobType } from "../../../data/jobs.js";
import type { Stats } from "../../../types/stats.js";

type EquippedItems = {
    weapon: WeaponId | null,
    armorTop: ArmorId | null,
    armorBottom: ArmorId | null,
}

type DerivedStats = {
    attack: number
    magic: number
    defense: number
    hp: number
    mp: number,
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

    const armorTop = equippedItems.armorTop
        ? EQUIPMENTS.armor[equippedItems.armorTop]
        : undefined

    const armorBottom = equippedItems.armorBottom
        ? EQUIPMENTS.armor[equippedItems.armorBottom]
        : undefined

    const attack = jobData.attackFormula(stats) + (weapon?.attack ?? 0);

    const magic = jobData.magicFormula(stats) + (weapon?.magic ?? 0);

    const defense =
        jobData.defenseFormula(stats) + (armorTop?.defense ?? 0) + (armorBottom?.defense ?? 0);

    const hp = jobData.hpFormula(level, jobData, stats);
    const mp = jobData.mpFormula(level, jobData, stats);
    const critChance = jobData.baseCritChance;
    const critDamage = BASE_CRIT_DAMAGE;

    return {
        attack,
        magic,
        hp,
        mp,
        critChance,
        defense,
        critDamage,
    }
}

