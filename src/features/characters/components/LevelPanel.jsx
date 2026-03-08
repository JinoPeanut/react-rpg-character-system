import { useCharacterStore } from "../store/characterStore";

function LevelPanel() {
    const level = useCharacterStore((state) => state.level);
    const levelUp = useCharacterStore((state) => state.levelUp);

    return (
        <div>
            <h2>레벨</h2>
            <p>Lv. {level}</p>
            <button onClick={levelUp}>레벨 업</button>
        </div>
    )
}

export default LevelPanel;