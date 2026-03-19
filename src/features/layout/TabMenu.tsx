import { useState } from "react";
import InventoryPanel from "../characters/components/InventoryPanel";
import CharacterPanel from "../characters/components/CharacterPanel";
import JobPanel from "../characters/components/JobPanel";
import EquipmentPanel from "../characters/components/EquipmentPanel";

export function TabMenu() {
    const [tab, setTab] = useState<"character" | "inventory" | "job" | "equipment">("character");

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                <button
                    onClick={() => setTab("character")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "character"
                            ? "bg-gray-400 border-b-transparent"
                            : "bg-gray-600"
                        }`}
                >
                    캐릭터
                </button>
                <button
                    onClick={() => setTab("inventory")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "inventory"
                            ? "bg-gray-400"
                            : "bg-gray-600"
                        }`}
                >
                    인벤토리
                </button>
                <button
                    onClick={() => setTab("job")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "job"
                            ? "bg-gray-400 border-b-transparent"
                            : "bg-gray-600"
                        }`}
                >
                    전직
                </button>
                <button
                    onClick={() => setTab("equipment")}
                    className={`px-4 py-2 rounded-t-lg border
                    ${tab === "equipment"
                            ? "bg-gray-400 border-b-transparent"
                            : "bg-gray-600"
                        }`}
                >
                    장비창
                </button>
            </div>
            <div className="-mt-[1px]">
                {tab === "character" && <CharacterPanel />}
                {tab === "inventory" && <InventoryPanel />}
                {tab === "job" && <JobPanel />}
                {tab === "equipment" && <EquipmentPanel />}
            </div>
        </div>
    )
}

export default TabMenu