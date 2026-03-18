import { useCharacterStore } from "../store/characterStore";

function StatPanel() {
    const stats = useCharacterStore((state) => state.stats);
    const increaseStat = useCharacterStore((state) => state.increaseStat);
    const decreaseStat = useCharacterStore((state) => state.decreaseStat);
    const remainingPoints = useCharacterStore((state) => state.remainingPoints);
    const baseStats = useCharacterStore((state) => state.baseStats);
    const statReset = useCharacterStore((state) => state.statReset);

    return (
        <div className="bg-gray-500 p-3 rounded-md">
            <p>남은 포인트: {remainingPoints}</p>

            {Object.entries(stats).map(([stat, value]) => {
                const key = stat as keyof typeof stats;

                return (
                    <div key={stat} className="flex">
                        {stat} : {value}
                        <button
                            onClick={() => increaseStat(key)}
                            disabled={remainingPoints <= 0}
                            className="rounded border p-1 mr-1 ml-1 
                            w-5 h-5 flex items-center justify-center leading-none"
                        >
                            +
                        </button>
                        <button
                            onClick={() => decreaseStat(key)}
                            disabled={value <= baseStats[key]}
                            className="rounded border p-1
                            w-5 h-5 flex items-center justify-center leading-none"
                        >
                            -
                        </button>
                    </div>
                )
            })}

            <div>
                <button onClick={statReset}>
                    전체 초기화
                </button>
            </div>
        </div>
    )
}

export default StatPanel;