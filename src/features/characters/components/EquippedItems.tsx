import { useCharacterStore } from "../store/characterStore"

export default function EquippedItems() {

    const equipped = useCharacterStore((s) => s.equippedItems)
    const unEquipItem = useCharacterStore((s) => s.unEquipItem)

    return (
        <div>

            <h2>장착중</h2>

            <div onClick={() => unEquipItem("weapon")}>
                무기: {equipped.weapon ?? "없음"}
            </div>

            <div onClick={() => unEquipItem("armor")}>
                방어구: {equipped.armor ?? "없음"}
            </div>

        </div>
    )
}