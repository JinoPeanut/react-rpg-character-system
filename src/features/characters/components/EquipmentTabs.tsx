import { useState } from "react"
import { useCharacterStore } from "../store/characterStore"
import { EQUIPMENTS } from "../../../data/equipments"

export default function EquipmentTabs() {

    const [tab, setTab] = useState<"weapon" | "armor">("weapon")

    const equipItem = useCharacterStore((s) => s.equipItem)
    const equipped = useCharacterStore((s) => s.equippedItems)

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

            {items.map(([id, item]) => {
                const isEquipped = equipped.weapon === id
                return (
                    <div
                        key={id}
                        onClick={() => equipItem(id)}
                    >
                        {item.name} {isEquipped && "(장착중)"}
                    </div>
                )
            })}

        </div>
    )
}