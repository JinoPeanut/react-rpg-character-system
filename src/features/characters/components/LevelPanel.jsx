import { useCharacterStore } from "../store/characterStore";

function LevelPanel() {
    const level = useCharacterStore((state) => state.level);
    const levelUp = useCharacterStore((state) => state.levelUp);
    const job = useCharacterStore((state) => state.job);

    return (
        <div>
            <h2>레벨</h2>
            <p>Lv. {level} {job}</p>
            <button onClick={levelUp}>레벨 업</button>
        </div>
    )
}

export default LevelPanel;