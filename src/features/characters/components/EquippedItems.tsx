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
            <div onDoubleClick={() => unEquipItem("weapon")}
                className="
                absolute top-[39%] bg-white w-20 h-20 opacity-90
                left-[3%]
                flex flex-col items-center justify-center text-sm
            ">
                {weapon ? weapon.name : ""}
            </div>

            <div onDoubleClick={() => unEquipItem("armorTop")}
                className="
                    absolute bg-white w-20 h-20 opacity-90
                    top-[19%] left-1/2 -translate-x-1/2
                    flex flex-col items-center justify-center text-sm
                ">
                {armorTop ? armorTop.name : ""}
            </div>

            <div onDoubleClick={() => unEquipItem("armorBottom")}
                className="
                absolute bg-white w-20 h-20 opacity-90
                top-[50%] left-1/2 -translate-x-1/2
                flex flex-col items-center justify-center text-sm
            ">
                {armorBottom ? armorBottom.name : ""}
            </div>

        </div >
    )
}