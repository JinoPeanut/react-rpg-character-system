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
        defense,
        critChance,
        critDamage
    } = calculateDerivedStats(level, job, stats, equippedItems);

    return (
        <div>
            <h2>추가 스탯계산</h2>

            <p>공격력: {attack.toFixed(2)}</p>
            <p>마력: {magic.toFixed(2)}</p>
            <p>HP: {hp.toFixed(0)}</p>
            <p>방어력: {defense.toFixed(2)}</p>
            <p>크리티컬 확률: {(critChance * 100).toFixed(0)}%</p>
            <p>크리티컬 대미지: {critDamage * 100}%</p>
        </div>
    )
}

export default DerivedStatsPanel;