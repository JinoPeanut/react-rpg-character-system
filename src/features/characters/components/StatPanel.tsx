import { useCharacterStore } from "../store/characterStore";

function StatPanel() {
    const stats = useCharacterStore((state) => state.stats);
    const increaseStat = useCharacterStore((state) => state.increaseStat);
    const decreaseStat = useCharacterStore((state) => state.decreaseStat);
    const remainingPoints = useCharacterStore((state) => state.remainingPoints);
    const baseStats = useCharacterStore((state) => state.baseStats);
    const statReset = useCharacterStore((state) => state.statReset);

    return (
        <div className="bg-gray-800/50 p-3 rounded-md text-gray-200">
            <p>남은 포인트: {remainingPoints}</p>

            {Object.entries(stats).map(([stat, value]) => {
                const key = stat as keyof typeof stats;

                return (
                    <div key={stat} className="flex item-center gap-2">
                        <span className="w-16">{stat}</span>
                        <span className="w-8 text-center">{value}</span>

                        <div className="flex gap-1 ml-auto">
                            <button
                                onClick={() => increaseStat(key)}
                                disabled={remainingPoints <= 0}
                                className="
                            rounded border bg-gray-600
                            shadow-[0_4px_10px_rgba(0,0,0,0.5)] w-5 h-5 flex
                            hover:shadow-lg transition 
                            items-center justify-center 
                            leading-none"
                            >
                                +
                            </button>
                            <button
                                onClick={() => decreaseStat(key)}
                                disabled={value <= baseStats[key]}
                                className="
                            rounded border bg-gray-600
                            shadow-[0_4px_10px_rgba(0,0,0,0.5)] w-5 h-5 flex
                            hover:shadow-lg transition
                            items-center justify-center 
                            leading-none"
                            >
                                -
                            </button>
                        </div>
                    </div>
                )
            })}

            <div className="flex justify-end">
                <button
                    onClick={statReset}
                    className="
                        border rounded p-1 mt-3
                        bg-gray-600
                        hover:shadow-[0_2px_8px_red]
                        hover:bg-red-500
                    "
                >
                    전체 초기화
                </button>
            </div>
        </div>
    )
}

export default StatPanel;