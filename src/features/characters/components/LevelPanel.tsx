import { JOBS } from "../../../data/jobs";
import { useCharacterStore } from "../store/characterStore";

function LevelPanel() {
    const level = useCharacterStore((state) => state.level);
    const levelUp = useCharacterStore((state) => state.levelUp);
    const job = useCharacterStore((state) => state.job);

    return (
        <div className="bg-gray-500 p-3 rounded-md">
            <p>Lv. {level}</p>
            <p>
                {JOBS[job]?.name}
                {level >= 10 && job === "adventure" && "(전직 가능)"}
            </p>
            <button onClick={levelUp}
                className="rounded bg-green-200 text-black p-1 mt-5"
            >
                레벨 업
            </button>
        </div>
    )
}

export default LevelPanel;