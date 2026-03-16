import { EQUIPMENTS } from "../../../data/equipments";
import { useCharacterStore } from "../store/characterStore"

export default function EquippedItems() {

    const equipped = useCharacterStore((s) => s.equippedItems);
    const unEquipItem = useCharacterStore((s) => s.unEquipItem);

    const weapon = equipped.weapon
        ? EQUIPMENTS.weapon[equipped.weapon]
        : null

    const armorTop = equipped.armorTop
        ? EQUIPMENTS.armor[equipped.armorTop]
        : null

    const armorBottom = equipped.armorBottom
        ? EQUIPMENTS.armor[equipped.armorBottom]
        : null

    return (
        <div>

            <h2>장착중</h2>

            <div>
                무기: {weapon ? weapon.name : "없음"}
                {weapon && (
                    <button onClick={() => unEquipItem("weapon")}>
                        해제
                    </button>
                )}
            </div>

            <div>
                상의: {armorTop ? armorTop.name : "없음"}
                {armorTop && (
                    <button onClick={() => unEquipItem("armorTop")}>
                        해제
                    </button>
                )}
            </div>

            <div>
                하의: {armorBottom ? armorBottom.name : "없음"}
                {armorBottom && (
                    <button onClick={() => unEquipItem("armorBottom")}>
                        해제
                    </button>
                )}
            </div>

        </div >
    )
}