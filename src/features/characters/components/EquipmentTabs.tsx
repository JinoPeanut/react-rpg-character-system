import { useState } from "react"
import { useCharacterStore } from "../store/characterStore"
import { EQUIPMENTS } from "../../../data/equipments"

export default function EquipmentTabs() {

    const [tab, setTab] = useState<"weapon" | "armor">("weapon")

    const equipItem = useCharacterStore((s) => s.equipItem)

    const items = Object.entries(EQUIPMENTS[tab])

    return (
        <div>

            <div>
                <button onClick={() => setTab("weapon")}>
                    무기
                </button>

                <button onClick={() => setTab("armor")}>
                    방어구
                </button>
            </div>

            <h2>{tab === "weapon" ? "무기" : "방어구"}</h2>

            {items.map(([id, item]) => (
                <div
                    key={id}
                    onClick={() => equipItem(tab, id)}
                >
                    {item.name}
                </div>
            ))}

        </div>
    )
}