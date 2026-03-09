import { useCharacterStore } from "../store/characterStore";

function StatPanel() {
    const stats = useCharacterStore((state) => state.stats);
    const increaseStat = useCharacterStore((state) => state.increaseStat);
    const decreaseStat = useCharacterStore((state) => state.decreaseStat);
    const remainingPoints = useCharacterStore((state) => state.remainingPoints);
    const baseStats = useCharacterStore((state) => state.baseStats);
    const statReset = useCharacterStore((state) => state.statReset);

    return (
        <div>
            <h2>Stats</h2>

            <p>남은 포인트: {remainingPoints}</p>

            {Object.entries(stats).map(([stat, value]) => (
                <div key={stat}>
                    {stat} : {value}
                    <button
                        onClick={() => increaseStat(stat)}
                        disabled={remainingPoints <= 0}
                    >
                        +
                    </button>
                    <button
                        onClick={() => decreaseStat(stat)}
                        disabled={value <= baseStats[stats]}
                    >
                        -
                    </button>
                </div>
            ))}

            <div>
                <button onClick={statReset}>
                    전체 초기화
                </button>
            </div>
        </div>
    )
}

export default StatPanel;