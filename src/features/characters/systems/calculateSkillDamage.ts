import { JOBS, type JobType } from "../../../data/jobs";
import { type Skill } from "../../../data/skills";
import type { Stats } from "../../../types/stats";
import { type EquippedItems } from "../store/characterStore";
import { calculateDerivedStats } from "./calculateDerivedStats";
import type { SkillLevel } from "../store/characterStore";


export function calculateSkillDamage(
    level: number,
    job: JobType,
    stats: Stats,
    equipments: EquippedItems,
    skill: Skill,
    skillLevels: SkillLevel,
) {
    const derived = calculateDerivedStats(level, job, stats, equipments);
    const jobData = JOBS[job];

    const mainStat = jobData.mainStat
        ? stats[jobData.mainStat]
        : 0;

    const attackOrMagic = derived[jobData.attackType];

    const skillLevel = skillLevels[skill.id] ?? 0;

    const totalIncrease = skill.maxLevel !== null && skill.maxLevel > 1
        ? (skill.damagePerLevel ?? 0) * (skillLevel - 1) / (skill.maxLevel - 1)
        : 0;
    const skillPercent = ((skill.damage ?? 100) + totalIncrease) / 100;

    const isCritical = Math.random() < derived.critChance;
    const critMultiplier = isCritical ? derived.critDamage : 1;

    const finalDamage = attackOrMagic * skillPercent * critMultiplier;

    return {
        damage: Math.floor(finalDamage),
        isCritical,
    }

}
