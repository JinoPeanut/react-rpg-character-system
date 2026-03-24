import { useCharacterStore } from "../store/characterStore";
import { calculateDerivedStats } from "../systems/calculateDerivedStats";

function DerivedStatsPanel() {
    const level = useCharacterStore((state) => state.level);
    const job = useCharacterStore((state) => state.job);
    const stats = useCharacterStore((state) => state.stats);
    const equippedItems = useCharacterStore((state) => state.equippedItems);

    const {
        attack,
        magic,
        hp,
        mp,
        defense,
        critChance,
        critDamage
    } = calculateDerivedStats(level, job, stats, equippedItems);

    return (
        <div className="rounded-md bg-gray-800/50 p-2 grid grid-cols-[150px_80px] gap-y-1">
            <span>공격력:</span>
            <span>{attack.toFixed(2)}</span>

            <span>마력:</span>
            <span>{magic.toFixed(2)}</span>

            <span>HP:</span>
            <span>{hp.toFixed(0)}</span>

            <span>MP:</span>
            <span>{mp.toFixed(0)}</span>

            <span>방어력:</span>
            <span>{defense.toFixed(2)}</span>

            <span>크리티컬 확률:</span>
            <span>{(critChance * 100).toFixed(0)}%</span>

            <span>크리티컬 대미지:</span>
            <span>{(critDamage * 100).toFixed(0)}%</span>
        </div>
    )
}

export default DerivedStatsPanel;