import { useState } from "react";
import InventoryPanel from "../characters/components/InventoryPanel";
import CharacterPanel from "../characters/components/CharacterPanel";
import JobPanel from "../characters/components/JobPanel";
import EquipmentPanel from "../characters/components/EquipmentPanel";
import SkillPanel from "../characters/components/SkillPanel";

export function TabMenu() {
    const [tab, setTab] =
        useState<"character" | "inventory" | "job" | "equipment" | "skill">("character");

    return (
        <div className="flex flex-col items-center">
            <div className="flex text-gray-200">
                <button
                    onClick={() => setTab("character")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "character"
                            ? "bg-blue-400 border-b-transparent"
                            : "bg-blue-500"
                        }`}
                >
                    캐릭터
                </button>
                <button
                    onClick={() => setTab("inventory")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "inventory"
                            ? "bg-yellow-400"
                            : "bg-yellow-500"
                        }`}
                >
                    인벤토리
                </button>
                <button
                    onClick={() => setTab("job")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "job"
                            ? "bg-purple-400 border-b-transparent"
                            : "bg-purple-500"
                        }`}
                >
                    전직
                </button>
                <button
                    onClick={() => setTab("equipment")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "equipment"
                            ? "bg-orange-400 border-b-transparent"
                            : "bg-orange-500"
                        }`}
                >
                    장비창
                </button>
                <button
                    onClick={() => setTab("skill")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "skill"
                            ? "bg-cyan-400 border-b-transparent"
                            : "bg-cyan-500"
                        }`}
                >
                    스킬
                </button>
            </div>
            <div className="-mt-[1px]">
                {tab === "character" && <CharacterPanel />}
                {tab === "inventory" && <InventoryPanel />}
                {tab === "job" && <JobPanel />}
                {tab === "equipment" && <EquipmentPanel />}
                {tab === "skill" && <SkillPanel />}
            </div>
        </div>
    )
}

export default TabMenu