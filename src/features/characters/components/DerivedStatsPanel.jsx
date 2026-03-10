import { useCharacterStore } from "../store/characterStore";
import { JOBS } from "../../../data/jobs";

function DerivedStatsPanel() {
    const level = useCharacterStore((state) => state.level);
    const job = useCharacterStore((state) => state.job);
    const stats = useCharacterStore((state) => state.stats);

    const jobData = JOBS[job];

    const attack = jobData.attackFormula(stats);
    const magic = jobData.magicFormula(stats);
    const hp = jobData.hpFormula(level, jobData, stats);
    const crit = null;
    const defense = jobData.defenseFormula(stats);

    return (
        <div>
            <h2>추가 스탯계산</h2>

            <p>공격력: {attack.toFixed(2)}</p>
            <p>마력: {magic.toFixed(2)}</p>
            <p>HP: {Math.floor(hp)}</p>
            <p>크리티컬 확률: {crit}</p>
            <p>방어력: {defense.toFixed(2)}</p>
        </div>
    )
}

export default DerivedStatsPanel;