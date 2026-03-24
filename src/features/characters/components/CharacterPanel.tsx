import DerivedStatsPanel from "./DerivedStatsPanel"
import LevelPanel from "./LevelPanel"
import StatPanel from "./StatPanel"



export function CharacterPanel() {

    return (
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg 
            text-white w-[500px] mx-auto border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-center">
                캐릭터 정보
            </h2>

            <LevelPanel />

            <div className="grid grid-cols-2 gap-4 rounded-lg mt-2">
                <StatPanel />
                <DerivedStatsPanel />
            </div>
        </div>
    )
}

export default CharacterPanel