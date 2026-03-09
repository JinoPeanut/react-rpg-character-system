import { useCharacterStore } from "../store/characterStore";
import { JOBS } from "../../../data/jobs";

function DerivedStatsPanel() {
    const job = useCharacterStore((state) => state.job);
    const stats = useCharacterStore((state) => state.stats);

    const jobData = JOBS[job];

    const attack = jobData.attackFormula(stats);
    const magic = jobData.magicFormula(stats);
    const hp = null;
    const crit = null;

    return (
        <div>
            <h2>추가 스탯계산</h2>

            <p>공격력: {attack.toFixed(2)}</p>
            <p>마력: {magic.toFixed(2)}</p>
            <p>HP: {hp}</p>
            <p>크리티컬 확률: {crit}</p>
        </div>
    )
}

export default DerivedStatsPanel;