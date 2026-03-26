import { JOBS } from "../../../data/jobs";
import { useCharacterStore, getRequiredExp } from "../store/characterStore";

function LevelPanel() {
    const level = useCharacterStore((state) => state.level);
    const levelUp = useCharacterStore((state) => state.levelUp);
    const job = useCharacterStore((state) => state.job);
    const exp = useCharacterStore((state) => state.exp);  // 추가

    const requiredExp = getRequiredExp(level);
    const expPercent = Math.min(100, (exp / requiredExp) * 100);

    return (
        <div
            className="
            bg-gray-800 px-4 py-3 rounded-md 
            border border-gray-700 flex flex-col gap-2"
        >
            <div className="flex items-center justify-between">

                {/* 왼쪽: 레벨 + 직업 */}
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-blue-400">
                        Lv. {level}
                    </span>
                    <div className="flex flex-col">
                        <span className="text-gray-200 font-semibold">
                            {JOBS[job]?.name}
                        </span>
                        {level >= 10 && job === "adventure" && (
                            <span className="text-purple-400 text-xs">
                                ✦ 전직 가능
                            </span>
                        )}
                    </div>
                </div>

                <button onClick={levelUp}
                    className="
                    px-4 py-2 rounded-lg
                    bg-green-600 hover:bg-green-500 
                    text-white font-semibold text-sm
                    transition active:scale-95
                    cursor-pointer"
                >
                    레벨 업
                </button>
            </div>
            {/* 경험치 바 */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-gray-400">
                    <span>EXP</span>
                    <span>{exp} / {requiredExp}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${expPercent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}

export default LevelPanel;