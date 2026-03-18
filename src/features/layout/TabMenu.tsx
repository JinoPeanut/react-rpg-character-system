import { useState } from "react";
import InventoryPanel from "../characters/components/InventoryPanel";
import CharacterPanel from "../characters/components/CharacterPanel";
import JobPanel from "../characters/components/JobPanel";
import EquipmentPanel from "../characters/components/EquipmentPanel";

export function TabMenu() {
    const [tab, setTab] = useState<"character" | "inventory" | "job" | "equipment">("character");

    return (
        <div className="flex gap-2 justify-center items-center">
            <div>
                <button onClick={() => setTab("character")}>
                    캐릭터
                </button>
                <button onClick={() => setTab("inventory")}>
                    인벤토리
                </button>
                <button onClick={() => setTab("job")}>
                    전직
                </button>
                <button onClick={() => setTab("equipment")}>
                    장비창
                </button>
            </div>
            <div>
                {tab === "character" && <CharacterPanel />}
                {tab === "inventory" && <InventoryPanel />}
                {tab === "job" && <JobPanel />}
                {tab === "equipment" && <EquipmentPanel />}
            </div>
        </div>
    )
}

export default TabMenu