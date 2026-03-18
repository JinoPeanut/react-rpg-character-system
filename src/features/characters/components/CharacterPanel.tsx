import DerivedStatsPanel from "./DerivedStatsPanel"
import LevelPanel from "./LevelPanel"
import StatPanel from "./StatPanel"



export function CharacterPanel() {

    return (
        <div className="bg-gray-400 p-4 rounded-lg shadow-lg 
            text-white w-[500px] mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">
                캐릭터 정보
            </h2>
            <div className="grid grid-cols-2 gap-4 rounded-lg">
                <LevelPanel />
                <StatPanel />
            </div>
            <div className="mt-4">
                <DerivedStatsPanel />
            </div>
        </div>
    )
}

export default CharacterPanel